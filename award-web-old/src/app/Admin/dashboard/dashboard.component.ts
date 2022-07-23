import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usersCount: number = 0;
  usersArchiveCount: number = 0;
  juryCount: number = 0;
  jury2020Count: number = 0;
  jury2021Count: number = 0;
  juryArchiveCount : number = 0;
  userQueriesCount: number = 0;
  userQueriesArchiveCount: number = 0;
  leadsCount: number = 0;
  leadsArchiveCount: number = 0;
  campaignList : any = [];

  paymentCreatedCount : number = 0;
  paymentSuccessPaidCount : number = 0;
  paymentSuccessUnpaidCount : number = 0;
  paymentArchiveCount : number = 0;
  totalNominations : number = 0;
  totalCartTrue : number = 0;
  totalCheckoutTrue : number = 0;
  totalNominationArchive : number = 0;
  nominationByAwardCategory: any[]; //Object containing nomination count by award category
  nominationByProductCategory: any[]; //Object containing nomination count by product category
  nominationByProductSubCategory: any[]; //Object containing nomination count by product sub category
  nominationBySubSubProductCategory: any[]; //Object containing nomination count by product sub sub category

  /**
   * Data source for nomination by product category tree view,
   * will be initialize by level 1 data and on hierarchy change
   * will get updated by `treeControl`
   */
  dataSource = new MatTreeNestedDataSource<any>();

  constructor(public commonService: CommonService) {
    this.dataSource.data = [];
   }

  ngOnInit() {
    this.getUsersCount();
    this.getLeadsCount();
    this.getJury2020Count();
    this.getJury2021Count();
    this.getUserQueriesCount();
    this.getCampaignList();
    this.getPaymentCreated();
    this.getPaymentSuccessPaid();
    this.getPaymentSuccessUnpaid();
    this.getNominationsCount();
    this.getArchiveLeadsCount();
    this.getArchiveUsersCount();
    this.getArchiveUserQueriesCount();
    this.getArchivePayments();
    this.getArchiveNominationCount();
    this.getArchiveJuryCount();
    this.getNominationsBycategory();

  }

  getLeadsCount() {
    const body = {
      archive : false,
      limit: 10,
      skip: 0
    }
    this.commonService._post('get-leads',body,(res)=>{
      this.leadsCount = res.count;
    },(err)=>{

   })
  }

  getArchiveLeadsCount() {
    const body = {
      archive : true,
      limit: 10,
      skip: 0
    }
    this.commonService._post('get-leads',body,(res)=>{
      this.leadsArchiveCount = res.count;
    },(err)=>{

   })
  }


  getUsersCount() {
    const body = {
      archive : false,
      limit: 10,
      skip: 0
    }
    this.commonService._post('user-list',body,(res)=>{
      this.usersCount = res.totalUser;

   },(err)=>{

   })
  }

  getArchiveUsersCount() {
    const body = {
      archive : true,
      limit: 10,
      skip: 0
    }
    this.commonService._post('user-list',body,(res)=>{
      this.usersArchiveCount = res.totalUser;

   },(err)=>{

   })
  }

  getJury2020Count() {
    const body = {
      archive : false,
      limit: 10,
      skip: 0,
      year: '2020'
    }
    this.commonService._post('get-jury-for-admin',body,(res)=>{
      this.jury2020Count = res.count;

   },(err)=>{

   })
  }

  getJury2021Count() {
    const body = {
      archive : false,
      limit: 10,
      skip: 0,
      year: '2021'
    }
    this.commonService._post('get-jury-for-admin',body,(res)=>{
      this.jury2021Count = res.count;

   },(err)=>{

   })
  }

  getArchiveJuryCount() {
    const body = {
      archive : true,
      limit: 10,
      skip: 0
    }
    this.commonService._post('get-jury-for-admin',body,(res)=>{
      this.juryArchiveCount = res.count;

   },(err)=>{

   })
  }

  getUserQueriesCount() {
    const body = {
      archive : false,
      limit: 10,
      skip: 0
    }
    this.commonService._post('query-list',body,(res)=>{
      this.userQueriesCount = res.count;

   },(err)=>{

   })
  }

  getArchiveUserQueriesCount() {
    const body = {
      archive : true,
      limit: 10,
      skip: 0
    }
    this.commonService._post('query-list',body,(res)=>{
      this.userQueriesArchiveCount = res.count;

   },(err)=>{

   })
  }

  getCampaignList() {
    const body = {
      limit : 5,
      skip : 0,
      group : 'name'
    }
    this.commonService._post('get-campaign-group',body,(res) => {
      this.campaignList = res.returnData;

    },(err) => {

    });
  }

  getPaymentCreated() {
    const body = {
      archive : false,
      status : 'created',
      type : '-1',
      skip : 0,
      limit : 10
    }

    this.commonService._post('payment-data',body,(res)=>{
      this.paymentCreatedCount = res.pageTotal;


   },(err)=>{

   });
  }

  getPaymentSuccessPaid() {
    const body = {
      archive : false,
      status : 'success',
      type : 'paid',
      skip : 0,
      limit : 10
    }

    this.commonService._post('payment-data',body,(res)=>{
      this.paymentSuccessPaidCount = res.pageTotal;


   },(err)=>{

   });
  }

  getPaymentSuccessUnpaid() {
    const body = {
      archive : false,
      status : 'success',
      type : 'unpaid',
      skip : 0,
      limit : 10
    }

    this.commonService._post('payment-data',body,(res)=>{
      this.paymentSuccessUnpaidCount = res.pageTotal;


   },(err)=>{

   });
  }

  getArchivePayments() {
    const body = {
      archive : true,
      status : '-1',
      type : '-1',
      skip : 0,
      limit : 10
    }

    this.commonService._post('payment-data',body,(res)=>{
      this.paymentArchiveCount = res.pageTotal;


   },(err)=>{

   });
  }

  getNominationsCount() {
    const body = {

      type:"-1",
      limit: 10,
      skip: 0
    }

    this.commonService._post('get-user-nominations',body,(res)=>{
      console.log(res);
      this.totalCartTrue=0;
      this.totalCheckoutTrue=0;

      this.totalNominations = res.nomineeTotal;

      this.totalCartTrue=res.cartTotal;
      this.totalCheckoutTrue = res.checkoutTotal;



   },(err)=>{

   });
  }

  getArchiveNominationCount() {

    const body = {

      type:"archive",
      limit: 10,
      skip: 0
    }

    this.commonService._post('get-user-nominations',body,(res)=>{
      console.log(res);
      this.totalNominationArchive = res.archiveTotal;



   },(err)=>{

   });
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
     (err) => {})
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

}
