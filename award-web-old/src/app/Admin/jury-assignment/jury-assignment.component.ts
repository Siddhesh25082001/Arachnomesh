import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { CommonService } from 'src/app/common.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-jury-assignment',
  templateUrl: './jury-assignment.component.html',
  styleUrls: ['./jury-assignment.component.css']
})
export class JuryAssignmentComponent implements OnInit {

  nominationByAwardCategory: any[]; //Object containing nomination count by award category
  nominationByProductCategory: any[]; //Object containing nomination count by product category
  nominationByProductSubCategory: any[]; //Object containing nomination count by product sub category
  nominationBySubSubProductCategory: any[]; //Object containing nomination count by product sub sub category
  dataSource = new MatTreeNestedDataSource<any>();
  checklistSelection = new SelectionModel<any>(true);
  data: any[] = [];
  juryId: string;
  nominations: any[]= [];
  selectedNominations: any=[];
  selectedNode: any;
  nominationDescendent: any[]=[];
  selectedProIds: any[]=[];

  constructor(private _route: ActivatedRoute, public commonService: CommonService) {
    this.dataSource.data = [];
   }

  ngOnInit(){
    this.juryId = this._route.snapshot.paramMap.get('juryId');
    if (this.juryId) {
      this.getNominationsBycategory();
      this.getNominationAssignment();
    }
  }

  /**
   * Fetch the nomination data grouped by award and product category
   */
   getNominationsBycategory() {
    this.commonService._get('admin/nominationByCategory',
     (res) => {
       this.nominationByAwardCategory = res.awardCategoryData;
       this.nominationByProductCategory = res.productCategoryData[0].byProductCategory;
       this.nominationByProductSubCategory = res.productCategoryData[0].byProductSubCategory;
       this.nominationBySubSubProductCategory = res.productCategoryData[0].byProductSubSubCategory;
       this.dataSource.data = this.nominationByProductCategory;
     },
     (err) => {alert(err)})
  }

  getNominationAssignment() {
    this.commonService._get(`admin/getNominationAssignment/${this.juryId}`,
     (res) => {
        const selected=res.assign;
        this.selectedNominations=selected.nominationId;
        this.nominationDescendent=selected.intermediateCat;
        this.selectedProIds=(selected.cat1).concat(selected.cat2, selected.cat3);
     },
     (err) => {alert(err)})
  }

  /**
   * Update the data source of tree view on hierarchy change
   */
  treeControl = new NestedTreeControl<any>((node: any) => {
    let nextLevelData = []
    if (node.level === "1") {
      nextLevelData = this.nominationByProductSubCategory.filter(val => node.productId === val.parentId)
    }
    if (node.level === "2") {
      nextLevelData = this.nominationBySubSubProductCategory.filter(val => node.productId === val.parentId)
    }
    if (node.level === "3") {

    }
    return nextLevelData;
  });

  /**
   * This utitlty method used by tree view to check if node have any child component
   */
  hasChild = (_: number, node: any) => {
    let nextLevelData = []
    if (node.level === "1") {
      nextLevelData = this.nominationByProductSubCategory.filter(val => node.productId === val.parentId)
    }
    if (node.level === "2") {
      nextLevelData = this.nominationBySubSubProductCategory.filter(val => node.productId === val.parentId)
    }
    if (nextLevelData.length > 0) {
      return true;
    }
    return false;
  };

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: any): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    const res2 = descendants.some(child => this.nominationDescendent.indexOf(child.productId)!==-1);
    return (result || res2) && !this.descendantsAllSelected(node);
  }

  closePopUp() {
    document.getElementById('questionModal').classList.remove('show');
    document.getElementById('questionModal').classList.remove('d-block');
    this.nominations=[];
  }

  viewNominees(node: any) {
    this.selectedNode=node;
    document.getElementById('questionModal').classList.add('show');
    document.getElementById('questionModal').classList.add('d-block');
    let body;
    if(node.level==='2') {
      body={
        productSubCategory: node.productId,
        archive: false
      };
    }
    if(node.level==='3') {
      body={
        productSubSubCategory: node.productId,
        archive: false
      };
    }
    this.commonService._post(`admin/getNominationByproductId`, body,
     (res) => {
        this.nominations=res.nomination;
     },
     (err) => {alert(err)})
  }

  leafNodeSelected(node: any) {
    if(this.selectedProIds.indexOf(node.productId)!==-1) {
      this.checklistSelection.select(node);
    }
    return this.checklistSelection.isSelected(node);
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: any): boolean {
    if(this.selectedProIds.indexOf(node.productId)!==-1) {
      this.checklistSelection.select(node);
    }
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: any): void {
    console.log('todoLeafItemSelectionToggle');
    this.checklistSelection.toggle(node);
    if(this.checklistSelection.isSelected(node)) {
      this.updateNominationTable(node, true);
    }
    else {
      this.updateNominationTable(node, false);
    }
    this.checkAllParentsSelection(node);
  }

  updateNominationTable(node: any, val: boolean) {
    let body;
    if(node.level==='2') {
      body={
        productSubCategory: node.productId,
        archive: false
      };
    }
    if(node.level==='3') {
      body={
        productSubSubCategory: node.productId,
        archive: false
      };
    }
    this.commonService._post(`admin/getNominationByproductId`, body,
     (res) => {
        res.nomination.forEach(nominee => {
          if(val && this.selectedNominations.indexOf(nominee._id)<0)
            this.selectedNominations.push(nominee._id);
          else {
            this.selectedNominations=this.selectedNominations.filter(x=> x!==nominee._id);
          }
        });
     },
     (err) => {alert(err)});
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: any): void {
    let parent: any | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  selectedNomination(e: any, nominee: any) {
    if(e.checked) {
      this.selectedNominations.push(nominee._id);
    }
    else {
      this.selectedNominations=this.selectedNominations.filter(x => x!==nominee._id);
    }
    this.checkForNominationToggle(this.selectedNode);
  }

  isNominationSelected(nominee) {
    const res2=this.selectedNominations.some(x => x===nominee._id);
    return res2;
  }

  checkForNominationToggle(node: any) {
    const set1=this.nominations;
    let common=set1.filter(item => this.selectedNominations.indexOf(item._id)!==-1);
    if(this.nominations.length===1) {
      if(common.length===1) {
        this.checklistSelection.select(this.selectedNode);
        this.checkAllParentsSelection(node);  
      }
      else {
        this.checklistSelection.deselect(this.selectedNode);
        this.checkAllParentsSelection(node);
      }
    }
    else if(common.length===this.nominations.length) {
      this.checklistSelection.select(this.selectedNode);
      this.checkAllParentsSelection(node);
      const index=this.nominationDescendent.indexOf(node.productId);
      if(index>-1)
        this.nominationDescendent.splice(index,1);
    }
    else {
      if(common.length===0) {
        const index=this.nominationDescendent.indexOf(node.productId);
        if(index>-1)
          this.nominationDescendent.splice(index,1);
      }
      else {
        if(this.nominationDescendent.indexOf(node.productId)===-1)
          this.nominationDescendent.push(node.productId);
      }
      this.checklistSelection.deselect(this.selectedNode);
      this.checkAllParentsSelection(node);
    }
  }

  checkNominationDescendent(node: any) {
    if(this.nominationDescendent.indexOf(node.productId)!==-1) {
      return true;
    }
    else {
      return false;
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: any): any | null {
    if (node.level === "1") {
      return null;
    }
    if (node.level === "2") {
      const prevLevelData = this.nominationByProductCategory.filter(val => node.parentId === val.productId);
      if (prevLevelData.length>0) {
        prevLevelData[0];
      }
    }
    if (node.level === "3") {
      const prevLevelData = this.nominationByProductSubCategory.filter(val => node.parentId === val.productId);
      if (prevLevelData.length>0) {
        prevLevelData[0];
      }
    }
    return null;
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: any): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: any): void {
    console.log('todoItemSelectionToggle');
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    //console.log(node, descendants);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    //descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  submit() {
    const dt = [...this.checklistSelection.selected];
    let cat1: string[] = [];
    let cat2: string[] = [];
    let cat3: string[] = [];

    console.log([...dt])
    for (let i = 0; i < dt.length;) {
      const node = dt[i];
      if (node.level === "1") {
        cat1.push(node.productId);
        dt.splice(i, 1);
      } else i++;
    }
    console.log([...dt])
    for (let i = 0; i < dt.length;) {
      const node = dt[i];
      if (node.level === "2") {
        if (cat1.findIndex(val => val === node.parentId) === -1) {
          cat2.push(node.productId);
        }
        this.removeLv(node, dt);
        dt.splice(i, 1);
      } else i++;
    }
    console.log([...dt])
    for (let i = 0; i < dt.length;) {
      const node = dt[i];
      if (node.level === "3") {
        cat3.push(node.productId);
        dt.splice(i, 1);
      } else i++;
    }
    let nominations=this.selectedNominations;
    let intermediateCat=this.nominationDescendent;
    const body = {
      assign:{cat1, cat2, cat3, nominations, intermediateCat},
      jury: this.juryId
    }
    console.log(body);
    this.commonService._post('/admin/assignNomination', body,
    (res) => alert(res.status),
    (error: HttpErrorResponse) => {alert(error.error.msg)})
  }

  removeLv(node: any, dt: any[]) {
    for (let i = 0; i < dt.length;) {
      const xc = dt[i];
      if (xc.level === "3" && xc.parentId === node.productId) {
        dt.splice(i, 1);
      } else i++;
    }
  }


}
