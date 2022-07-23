import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { NavigationEnd, Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  fileToUpload: File = null;
  name: string;
  email: string;
  phone: string;
  text: string;
  btnflag: boolean = true;
  userList: any = [];
  disabled: boolean = false;
  queryFlag: string;
  employeeData:any;
  currentId: string;
  totalPage = 0;
  currentPage = 1;
  //archivePagination = false;
  totalItem = 10;
  file:string;
  action =   {};
  archive=false;
  mySubscription: any;
  leads: any;
  sort:string;
  orderBy: string;
  from: any;
  to: any;
  searchText: string;
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
    this.getEmployeeData()
    this.getUserList(this.archive,this.from, this.to);
   // this.getArchiveLeads();
  }

  getEmployeeData(){
    this.commonService._get('getEmployeeData',res=>{
      this.employeeData=res
    },err=>{

    })
  }
  getUserList(flag,from="",to=""){
    this.leads = [];

    const body={
      limit: this.totalItem,
      skip: (this.currentPage - 1) * this.totalItem,
      archive: flag,
      sort: this.sort,
      orderBy: this.orderBy,
      start:from,
      enddate:to,
      searchText:this.searchText
    }
  
    this.commonService._post('get-leads',body,(res)=>{
      
      this.leads = res.result;
      console.log(this.leads);
      this.totalPage = Math.ceil(res.count / this.totalItem);
      for (let index = 0; index < this.leads.length; index++) {
        const element = this.leads[index];
        this.action[element['_id']+'_status'] = element['status'];
        this.action[element['_id']+'_cmnt'] = element['comment'];
      }
   },(err)=>{

   });
  }
  navigate(userId){
    this.router.navigate(['/nominations',{id:userId}]);
    
  }


ngOnDestroy() {
  if (this.mySubscription) {
    this.mySubscription.unsubscribe();
  }
}

onBlurMethod(val,id,type) {
  if (val.trim()) {
   let temp:any = {};
   temp[type] = val;
    this.commonService._post('update-status',{doc:temp,recordId:id},(res)=>{
     
    },(err)=>{
          console.log(err);
    });
  }
} 

deletePost(id){
  this.commonService._post('delete-lead',{recordId:id},(res)=>{
    this.getUserList(this.archive,this.from, this.to);
  },(err)=>{
        console.log(err);
  });
}
onChangeLeadAssigned(event,id){

  this.onBlurMethod(event.target.value,id,'leadAssigned')
  }
  
  onChangeLeadStatus(event,id){
    this.onBlurMethod(event.target.value,id,'leadStatus')
  
  
  }

getArchiveLeads(){
  // this.leads=[];
  // this.archive=true;
  // let limit= this.totalItem;
  // let skip= (this.currentPage - 1) * this.totalItem;
  // this.commonService._get(`get-archive-leads/${skip}/${limit}`,(res)=>{
  //  // this.getUserList();
  //  this.leads = res.result;
  //  console.log(this.leads);
   
  //   this.totalPage = Math.round(res.count / this.totalItem);
  //  for (let index = 0; index < this.leads.length; index++) {
  //    const element = this.leads[index];
  //    this.action[element['_id']+'_status'] = element['status'];
  //    this.action[element['_id']+'_cmnt'] = element['comment'];
  //  }
  // },(err)=>{
  //       console.log(err);
  // });

  if(this.archive) {
    this.archive = false
    this.getUserList(this.archive,this.from, this.to);
  }else{
    this.archive=true;
    this.getUserList(this.archive,this.from, this.to);
  }
}

filterDateLeads() {
  this.getUserList(this.archive,this.from, this.to);
}

setOrder(sort : string) {
  
  this.orderBy = this.orderBy === "ASC" ? "DESC" : "ASC";
  this.sort = sort;
  this.getUserList(this.archive,this.from, this.to);
}

didModify() {
  this.getUserList(this.archive,this.from, this.to);
}

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.getUserList(this.archive,this.from, this.to);
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++
      this.getUserList(this.archive,this.from, this.to);
    }
  }
}

