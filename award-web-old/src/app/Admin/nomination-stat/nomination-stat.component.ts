import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/common.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-nomination-stat',
  templateUrl: './nomination-stat.component.html',
  styleUrls: ['./nomination-stat.component.css']
})
export class NominationStatComponent implements OnInit {

  displayedColumns: string[] = []; //Contails list of column to be shown
  dataSource: MatTableDataSource<any>; //Table data source, takes array of nomination count as input
  awardWiseCount: any[];  // Decides no. of column exist and use to set the column header
  productWiseCount: any;  //An object conatining nomination count by product category distributed over awards caqtegory
  nominations: MatTableDataSource<any>;
  nom: any;
  displayedColumns2: string[] = ['productName', 'totalMarks'];
  type: string="";
  constructor(public commonService: CommonService, private _liveAnnouncer: LiveAnnouncer) { }
  
  ngOnInit() {
    this.getNominationsBycategory();
  }

  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /**
   * This method fetch the data from api and set it to respective property
   */
  private getNominationsBycategory() {
    this.commonService._get('admin/nominationByFlatCategory',
      (res) => {

        //Setting values
        this.awardWiseCount = res.awardWiseCount;
        this.productWiseCount = res.productWiseCount;

        //Table Init
        this.initColums();
        this.initDataSource();

      },
      (err) => { })
  }

  /**
   * @description retruns nomination count for given product category and award category
   * @param awdId { string } - Award id of the column
   * @param awardWiseCount { any[] } - array having award wise nomination count of given product category
   * @returns { number }  total nomination count
   */
  getCountValue(awdId: string, awardWiseCount: any[]): number {
    let idx = awardWiseCount.findIndex(val => val.k[0] === awdId);

    if (idx !== -1) {
      return awardWiseCount[idx].v;
    }
    return 0;
  }

  /**
   * Utitlity method used to filter data from table based on given input
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Initialize the display colums array, always call after fetching and setting the nomination count data.
   */
  initColums() {
    this.awardWiseCount.forEach(val => {
      this.displayedColumns.push(val.awardCategoryName)
    });
    this.displayedColumns.unshift('productName');
  }

  /**
   * Initialize the table data source, always call after fetching and setting the nomination count data.
   */
  initDataSource() {
    let data = this.formatData();
    this.dataSource = new MatTableDataSource(data);
  }

  /**
   * Utitlty function which convert the given data into the suitable format,
   * that will be used as source for the hierarchical table view.
   */
  formatData(): any[] {
    let dataIn1 = [...this.productWiseCount.byProductCategory];
    let dataIn2 = [...this.productWiseCount.byProductSubCategory];
    let dataIn3 = [...this.productWiseCount.byProductSubSubCategory];
    let dataOut1 = [];
    let dataOut2 = [];

    //Push all the subcategory below the corresponding category
    dataIn1.forEach((val: any, idx: number) => {
      if (val.level === 'LEVEL_1') {
        let count = {
          isChildExists: false,
        };
        this.awardWiseCount.forEach(val => {
          count[val.awardCategoryId] = 0;
        });
        // filter all the subcategory
        let child = dataIn2.filter(chVal => {
          if (val.productId === chVal.parentId) {
            //push award wise count of each sub category
            this.awardWiseCount.forEach(val => {
              count[val.awardCategoryId] += this.getCountValue(val.awardCategoryId, chVal.awardWiseCount);
            });
            return true;
          } else {
            return false;
          }
        });
        if (child.length > 0) {
          count.isChildExists = true;
        }
        val.isBalanced = this.isRowCountBalanced(count, val);
        dataOut1.push(val, ...child);
      }
    });

    //Push all the subSubcategory below the corresponding category
    dataOut1.forEach((val: any, idx: number) => {
      dataOut2.push(val);
      if (val.level === 'LEVEL_2') {
        let count = {
          isChildExists: false,
        };
        this.awardWiseCount.forEach(val => {
          count[val.awardCategoryId] = 0;
        });
        //filter subsub caterory
        let child = dataIn3.filter(chVal => {
          if (val.productId === chVal.parentId) {
            //push award wise count of each sub category
            this.awardWiseCount.forEach(val => {
              count[val.awardCategoryId] += this.getCountValue(val.awardCategoryId, chVal.awardWiseCount);
            });
            return true;
          } else {
            return false;
          }
        });
        if (child.length > 0) {
          count.isChildExists = true;
        }
        val.isBalanced = this.isRowCountBalanced(count, val);
        dataOut2.push(...child);
      }
    });
    return dataOut2;
  }

  /**
   *
   * @private
   * @description
   * Utility method use by `formatData` method to check if row count is balanced or not
   */
  isRowCountBalanced(countObj: any, productCategory: any): string {
    for (const awardId in countObj) {
      if (countObj.hasOwnProperty(awardId) && awardId !== 'isChildExists') {
        const currCount = this.getCountValue(awardId, productCategory.awardWiseCount);
        if (countObj[awardId] !== currCount && countObj.isChildExists) {
          return 'unbalanced-row';
        }
      }
    }
    return 'balanced-row';
  }

  checkIfLastLevel(element) {
    if(element.level==='LEVEL_3') {
      return true;
    }
    else if(element.level==='LEVEL_2') {
      let dataIn3 = [...this.productWiseCount.byProductSubSubCategory];
      if(!dataIn3.some(x => x.parentId===element.productId)) {
        return true; 
      }
    }
    else {
      let dataIn2 = [...this.productWiseCount.byProductSubCategory];
      if(!dataIn2.some(x => x.parentId===element.productId)) {
        return true; 
      }
    }
    return false;
  }

  announceSortChange(sortState: Sort) {
      if(sortState.direction==='asc') {
        this.nom=this.nom.sort((a, b) => a[sortState.active] < b[sortState.active] ? -1 : 1)
        this.nominations=new MatTableDataSource(this.nom);
      }
      else if(sortState.direction==='desc') {
        this.nom=this.nom.sort((a, b) => a[sortState.active] < b[sortState.active] ? 1 : -1)
        this.nominations=new MatTableDataSource(this.nom);
      }
  }

  viewAllNominations(elem, awd) {
    this.nominations=new MatTableDataSource<any>([]);
    this.nom=[];
    let body;
    if(elem.level==='LEVEL_3') {
      body={
        productSubSubCategory: elem.productId,
        archive: false,
        payment: true,
        awardCategory: awd,
        "createdAt": { $gte: new Date("2021-01-04") }
      }
    }
    else if(elem.level==='LEVEL_2') {
      body={
        productSubCategory: elem.productId,
        archive: false,
        payment: true,
        awardCategory: awd,
        "createdAt": { $gte: new Date("2021-01-04") }
      }
    }
    else {
      body={
        productCategory: elem.productId,
        archive: false,
        payment: true,
        awardCategory: awd,
        "createdAt": { $gte: new Date("2021-01-04") }
      }
    }
    if(this.type==="true") {
      body.answerSubmitted=true;
    }
    this.commonService._post('/admin/getNominationByproductId', body,
    (res) => {
      this.nominations=new MatTableDataSource<any>(res.nomination);
      this.nominations.sort = this.sort;
      this.nom=res.nomination;
    }, (err)=> {
      alert("Unable to fetch nominations");
    });
  }

}
