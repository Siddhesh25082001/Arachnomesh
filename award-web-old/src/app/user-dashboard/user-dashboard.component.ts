import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  id:string = localStorage.getItem("userId"); 
  //paymentUrl = `${environment.domain}ng-award/#/payment`;
  cartUrl = `${environment.domain}cart.html`;
  tableData:any = [];
  userInfo: any;
  cUrl:string;
  modalData:any={};
  pageNo: number = 1;
  count: number = 0;
  constructor(public commonService: CommonService, public router: Router) {
    console.log(environment.domain);
   if(this.id){
      this.getUserActivityData();
      this.getUserInfo();
   }else{
      window.location.href = `${environment.domain}register.html`;
   }
  }

  ngOnInit() {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload');
      location.reload(); 
    } else {
      localStorage.removeItem('foo'); 
    }
  }
  
  getUserActivityData(){
    this.commonService._post('user-status/'+this.pageNo+'/'+this.count,{userId:this.id},async (res)=>{
      console.log(res);
      
      for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index];
        this.tableData.push(element);
      }
      this.count = res.count;
      this.pageNo = res.currentPage;
      // this.tableData = res;
      //  console.log(this.tableData);
    },(err)=>{

    });
  }

  goToCategory(){
    window.location.href = `${environment.domain}award-category.html`;
  }

  getUserInfo(){
    this.commonService._post('check-registration-data',{id:this.id},async (res)=>{
      this.userInfo = res[0];
       console.log(this.userInfo);
      this.cUrl = `${environment.domain}my-url/${this.userInfo.companyName}`;
    },(err)=>{

    });
  }

  removeData(flag,id,i){
    if(!flag){
      this.commonService._post('remove-item',{nomineeId:id},async (res)=>{
          if(res){
            this.tableData.splice(i, 1);
            this.getUserInfo();
          }
         //this.getUserActivityData();
      },(err)=>{
  
      });
    }
  }
  
  setDataForModal(i){
    this.modalData = {};
   // this.commonService._post({},()=>{},()=>{});
    this.modalData['date'] = this.tableData[i]['payDate'][0];
    this.modalData['id'] = this.tableData[i]['txn'][0];
    this.modalData['for'] = this.tableData[i]['awardName'][0];
  }
  changeNumber(){
    this.router.navigate(['/login',{query:'update-number'}])
  }

  copyText(){
    let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = this.cUrl;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
  }
  
  onScroll() {  
 //  if(typeof(this.count) == "undefined"){
    this.pageNo = this.pageNo  + 1;
    this.getUserActivityData();
 //  }
  }
}
