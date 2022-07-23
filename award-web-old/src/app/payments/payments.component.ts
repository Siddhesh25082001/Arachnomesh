import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../common.service';
import { environment } from './../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';

declare var Razorpay: any;
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit,OnDestroy {
  paymentData:any = {};
  bookingDetails:any;
  orderDetails: {};
  public userId = localStorage.getItem("userId");  
  public cart:any;
  home = `${environment.domain}cart.html?view=cart`;
  mySubscription: any;
  discountAmount=0;
  referalCode:string;
  constructor(public commonService: CommonService,public router: Router) {
  if(this.userId){
      this.getPaymentData();
  }else{
      window.location.href = `${environment.domain}`;
  }
  
  }
  
 

  ngOnInit() {
    //this.openDemo();
    console.log(environment);
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    }); 
  }

  createRzpayOrder(data) {
    this.orderDetails = {}
    this.commonService._post('get-order-id',{amount:data.amount,awards:data.nominations,id:this.userId},(res)=>{
      this.orderDetails = res;
      
      this.payWithRazor(data.nominations);
    },(err)=>{
        console.log(err);
    });
  }

  payWithRazor(awards) {
    const options: any = {
      key: environment.key,
      amount: this.orderDetails['amount_due'],
      currency: 'INR',
      name: 'Channelier Awards',
      description: 'Amount for channelier awards',
      image: './assets/images/footer-channelier.png',
      order_id: this.orderDetails['id'],
      modal: {
        escape: true,
      },
      notes: {user_id: this.userId,awards: awards},
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      console.log(response);
      console.log(this.orderDetails);
      this.commonService._post('confirm-booking',{order:this.orderDetails,sucessData:response,discount:this.referalCode+"/"+this.discountAmount},(res)=>{
         
      },(err)=>{
          console.log(err);
      });
      //this.orderDetails = {}; 
      this.getPaymentData();
      setTimeout(() => {
        this.openDemo();
      },0);
    });
    options.modal.ondismiss = (() => { 
      alert("transaction cancelled");
      this.router.navigate(['/payment']);
     // window.location.href = this.home;
    });
    const rzp = new Razorpay(options);
    rzp.open();
  }

  getPaymentData() {
    this.commonService._post('cart',{id:this.userId},(data:any)=>{
      this.paymentData = data;
    },(err)=>{
      window.location.href = `${environment.domain}cart.html`;
    });
  }

  payment(){
    this.commonService._post('cart', { id: this.userId }, (data: any) => {
      
      
      if (this.paymentData.amount == 0) {
        if (this.discountAmount==0) {
          this.discountAmount = this.paymentData.firstNomineeDiscount;
        }
        data.amount=0;
        this.orderDetails = {}
        this.commonService._post('confirm-booking-withZeroPayment', { amount: data.amount, awards: data.nominations, id: this.userId }, (res) => {
          this.orderDetails = res;
          console.log(this.orderDetails);
          
          let signatureData={
            "order_id": res.order_id,
            "signature": "signature_" + res.order_id
          }
          this.commonService._post('confirm-booking', { order: this.orderDetails, sucessData: signatureData, discount: this.referalCode + "/" + this.discountAmount }, (res) => {
              console.log(res);
              
          }, (err) => {
            console.log(err);
          });
         
        }, (err) => {
          console.log(err);
        });
        setTimeout(() => {
          this.openDemo();
        }, 0);
        // this.getPaymentData();
      } else {
      
        this.createRzpayOrder(this.paymentData);
      }
    }, (err) => {
      window.location.href = `${environment.domain}cart.html`;
    });
  }

   
  
  
  removeData(id){
    this.commonService._post('remove-item',{nomineeId:id},(res)=>{
      console.log(res);
      this.getPaymentData();
    },(err)=>{
      console.log(err);
    });
  }
  //
  dashboardPage(){
    window.location.href = `${environment.domain}ng-award/#/user-dashboard`;
    //this.router.navigate(['/user-dashboard'])
  }
  goBack(){
   window.location.href = `${environment.domain}award-category.html`;
  }
  
  goCart(){
    window.location.href = `${environment.domain}cart.html`;
  }

  invalidReferal() {
          document.getElementById('invalid-referal').style.display="";
          document.getElementById('valid-referal').style.display="none";
          document.getElementById('subtotal-toggle').style.display="none";
          document.getElementById('discount-toggle').style.display="none";
          document.getElementById('promoHide').style.display="";
  }

   ApplyPromo() {
     
      if (this.referalCode.length == 7) {
      let discountValue=this.referalCode.slice(2,6);
      let discountNum = parseInt(discountValue);
      
        if(!Number.isNaN(discountNum)) {
          this.discountAmount=Math.round((((parseInt(discountValue))/13)*100));
          this.paymentData.GST=(((this.paymentData.totalwithoutgst/100)-this.discountAmount)*0.18);
          this.paymentData.amount=(((this.paymentData.totalwithoutgst/100)-this.discountAmount)+(this.paymentData.GST))*100;
          
          document.getElementById('valid-referal').style.display="";
          document.getElementById('invalid-referal').style.display="none";
          document.getElementById('subtotal-toggle').style.display="";
          document.getElementById('discount-toggle').style.display="";
          document.getElementById('promoHide').style.display="none";
        } else {
          this.invalidReferal();
          return false;
        }
      

    }else{

      this.invalidReferal();
      return false;
     
    }


  }

  ApplyReferal($event){
    const element=$event;
    this.referalCode=element.target.value;
  }
  
  openDemo(){
    console.log('show');
    
    let element: HTMLElement = document.getElementById('demo') as HTMLElement;
    //setTimeout(() => {
      element.click();
    //};
  //   element.on('hidden.bs.modal', function () {
  //     // do something…
  // });
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
