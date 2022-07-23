import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  fileToUpload: File = null;
  name: string;
  email: string;
  phone: string;
  text: string;
  temp:any = [];
  temp1:any = [];
  campaignRegion: any = [];
  paymentList: any = [];
  dataList:any = [];
  groupList:any = [];
  disabled: boolean = false;
  queryFlag: string;
  currentId: string;
  file:string;
  mySubscription: any;
  modalDataKey:any;
  modalData: any = {};
  totalPage = 0;
  currentPage = 1;
  totalItem = 10;
  group:any = 'name';
  toggle = 0;
  from: any;
  to: any;
 
  constructor(public commonService: CommonService,public router: Router) {  }

  ngOnInit() {
    
    //this.getDataFortable();
    this.getGroupCampaign(this.from, this.to);
  }

  // getPaymentData(){
  //   this.commonService._get('payment-data',(res)=>{
  //     this.paymentList = res;
  //     console.log(res);
      
  //  },(err)=>{

  //  });
  // }

  

  getGroupCampaign(from="",to="") {
    
    this.dataList = [];
    const body = {
      group : this.group,
      start:from,
      enddate:to,
      limit: this.totalItem,
      skip: (this.currentPage-1) * this.totalItem,
    }
    this.commonService._post('get-campaign-group',body,(res) => {
      this.groupList = res.returnData;
      
      this.totalPage = Math.ceil(res.pageTotal / this.totalItem);
      console.log(this.groupList);
      //console.log(this.groupList);
    },(err) => {

    });
  }
  
  getExpandedData(value){
    
    const body = {
      group : this.group,
      value : value,
      
    }
    this.commonService._post('get-campaign-data',body,(res)=>{
      this.dataList = res.returnData
      
      
      
     
      //console.log(res);
  //   this.campaignRegion = [...new Set(this.dataList.map(item =>{
  //   let camapginData={
  //     region:item.fields.value,
  //     date:item.createdAt
  //   }

  //   //console.log(camapginData);
     
  //   return(camapginData);
   
    
  // }))];
   },(err)=>{

   });
 
  }

  getGroupName () {
    this.getGroupCampaign(this.from, this.to);
  }

  goBackButton() {
    this.getGroupCampaign(this.from, this.to);
  }

  viewDetails(data){
    // this.temp1 = [];
    // this.temp = [];
     this.modalData = data;
     console.log(data);
     this.modalDataKey = Object.keys(this.modalData);
     //.length;
    // console.log(data);
    // this.commonService._post('payment-details',{id:data},(res)=>{
    // this.temp1 = res;
    // this.temp = res;
    // this.modalData = res;
    // this.modalData.push(amount);
    //console.log(this.modalData);
      
  //  },(err)=>{

  //  });
  }


  dataListFilter(region){
    // console.log(this.dataList.filter(item => item.fields));
    //changed from region to name
    return this.dataList.filter(item =>{
      // return(item.fields.value==region);
      return item;
      
    })
   
  }

  filterDataCampaign() {
    this.getGroupCampaign(this.from, this.to);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getGroupCampaign(this.from, this.to);
      
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
      this.getGroupCampaign(this.from, this.to);
    
    }
  }

}
