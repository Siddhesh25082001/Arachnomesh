import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  fileToUpload: File = null;
  name: string;
  email: string;
  phone: string;
  text: string;
  userList: any = [];
  disabled: boolean = false;
  queryFlag: string;
  currentId: string;
  file:string;
  mySubscription: any;
  queryList: any;
  action =   {};
  archive = false;
  totalPage = 0;
  currentPage = 1;
  totalItem = 10;
  orderBy:string;
  sort: string;
  from: any;
  to: any;
  searchText:string;
  employeeData:any


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
    this.getUserList(this.archive,this.from, this.to);
  }

  getUserList(flag,from="",to=""){
    const body={
      limit: this.totalItem,
      skip: (this.currentPage - 1) * this.totalItem,
      archive: flag,
      sort: this.sort,
      orderBy: this.orderBy,
      start:from,
      enddate:to,
      searchText: this.searchText
    }
    this.commonService._post('query-list',body,(res)=>{
      this.queryList = res.result;
      this.totalPage = Math.ceil(res.count / this.totalItem);
      for (let index = 0; index < this.queryList.length; index++) {
        const element = this.queryList[index];
        this.action[element['_id']+'_status'] = element['status'];
        this.action[element['_id']+'_cmnt'] = element['comment'];
      }
      console.log(res);
      
   },(err)=>{

   });
  }
  navigate(userId){
    this.router.navigate(['/nominations',{id:userId}]);
    
  }

  onBlurMethod(val,id,type) {
    if (val.trim()) {
     let temp:any = {};
     temp[type] = val;
     console.log(temp);
     
      this.commonService._post('add-userqueries-remark',{doc:temp,recordId:id},(res)=>{
       console.log(res);
      },(err)=>{
            console.log(err);
      });
    }
  }

  
archiveQueries(id){
  this.commonService._post('archive-data',{recordId:id,updateFlag:this.archive},(res)=>{
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

  getEmployeeData(){
    this.commonService._get('getEmployeeData',res=>{
      this.employeeData=res
    },err=>{
      console.log(err);
      
    })
  }

getArchiveQueries(){
  // if(!this.archive){
  //   this.archive = true;
  //   this.commonService._get('archive-query-list',(res)=>{
  //     this.queryList = res;
  //     //console.log(res);
  //     for (let index = 0; index < res.length; index++) {
  //       const element = res[index];
  //       this.action[element['_id']+'_status'] = element['status'];
  //       this.action[element['_id']+'_cmnt'] = element['comment'];
  //     }
      
  //  },(err)=>{
  
  //  });
  // }else{
  //   this.archive = false;
  //   this.getUserList(this.archive);
  // }

  

  if(this.archive) {
    this.archive = false
    this.getUserList(this.archive,this.from, this.to);
  }else{
    this.archive=true;
    this.getUserList(this.archive,this.from, this.to);
  }
}

filterDataQuery() {
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

ngOnDestroy() {
  if (this.mySubscription) {
    this.mySubscription.unsubscribe();
  }
}

}
