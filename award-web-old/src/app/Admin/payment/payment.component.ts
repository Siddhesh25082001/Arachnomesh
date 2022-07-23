import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  fileToUpload: File = null;
  name: string;
  email: string;
  phone: string;
  text: string;
  temp:any = [];
  temp1:any = [];
  archive:any = false;
  paymentList: any = [];
  disabled: boolean = false;
  queryFlag: string;
  currentId: string;
  file:string;
  mySubscription: any;
  modalData: any = [];
  type: any;
  totalPage = 0;
  currentPage = 1;
  totalItem = 10;
  status: any;
  from: any;
  to: any;
  orderBy:string;
  sort:string;
  searchregex:string

  constructor(public commonService: CommonService,public router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });    
  }

  ngOnInit() {
    this.getPaymentData(this.from, this.to);

  }

  getPaymentData(from="",to=""){
    if(this.status == "created") {
      this.type == "unpaid";
    }
    const body = {
      type : this.type,
      limit: this.totalItem,
      skip: (this.currentPage-1) * this.totalItem,
      status: this.status,
      archive: this.archive,
      start:from,
      enddate:to,
      sort: this.sort,
      orderBy: this.orderBy,
      searchText:this.searchregex
    }
    
    this.commonService._post('payment-data',body,(res)=>{
      this.paymentList = res.result;
      console.log(this.paymentList);
      this.totalPage = Math.ceil(res.pageTotal / this.totalItem);
     
      
      
   },(err)=>{

   });
  }

  

  searchPayment(e){
    console.log(e.target.value);
    
    // let searchregex={"user.companyName":`/^${e.target.value}/`}
        this.searchregex=e.target.value;

    this.getPaymentData();
  }
  viewDetails(data,amount,orderId){
    this.temp1 = [];
    this.temp = [];
    this.modalData = [];
    console.log(data);
    this.commonService._post('payment-details',{id:data},(res)=>{
    this.temp1 = res;
    this.temp = res;
    this.modalData = res;
    this.modalData.push(amount);
    this.modalData.push(orderId);
    
      
   },(err)=>{

   });
  }
  getArchivePayments(){

    if(!this.archive){
      this.archive = true;
      this.getPaymentData(this.from, this.to);
    //   this.commonService._get('archive-payment-list',(res)=>{
    //     this.paymentList = res.result;
        
    //     // for (let index = 0; index < res.length; index++) {
    //     //   const element = res[index];
    //     //   this.action[element['_id']+'_status'] = element['status'];
    //     //   this.action[element['_id']+'_cmnt'] = element['comment'];
    //     // }
        
    //  },(err)=>{
    
    //  });
    }else{
      this.archive = false;
      this.getPaymentData(this.from, this.to);
    }
  
  }
  archivePayments(id){
    this.commonService._post('archive-payment',{recordId:id,updateFlag:this.archive},(res)=>{
      // this.archive = !this.archive
      if(this.archive){
        this.getArchivePayments();
      }else{
        this.getPaymentData(this.from, this.to);
      }
     },(err)=>{
           console.log(err);
     });
  }

  

  filterStatusPayments() {
    this.getPaymentData(this.from, this.to);
  }

  filterAmountPayments() {
    this.getPaymentData(this.from, this.to);
    
  }

  filterDatePayments() {
    this.getPaymentData(this.from, this.to);
  }

  setOrder(sort : string) {
  
    this.orderBy = this.orderBy === "ASC" ? "DESC" : "ASC";
    this.sort = sort;
    this.getPaymentData(this.from, this.to);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPaymentData(this.from, this.to);
      
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
      this.getPaymentData(this.from, this.to);
    }
  }

  


ngOnDestroy() {
  if (this.mySubscription) {
    this.mySubscription.unsubscribe();
  }
}
  
}