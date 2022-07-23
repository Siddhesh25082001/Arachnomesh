import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router, NavigationEnd } from '@angular/router';
import { ReversePipe } from '../../reverse.ngFor.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit,OnDestroy {
  fileToUpload: File = null;
  name: string;
  email: string;
  phone: string;
  text: string;
  archive:boolean = false;
  userList: any = [];
  disabled: boolean = false;
  queryFlag: string;
  currentId: string;
  file:string;
  mySubscription: any;
  totalPage=0;
  currentPage=1;
  totalItem=10;
  archivePagination=false;
  orderBy:string
  sort:string;
  from: any;
  to: any;
  action =   {};
  searchText:string;
  employeeData:any

  constructor(public commonService: CommonService,public router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        
        this.router.navigated = false;
      }
    });   
  }

  ngOnInit() {
    
    this.getUserList(this.from, this.to);
  }

  getUserList(from="",to=""){
    const body={

      limit:this.totalItem,
      skip:(this.currentPage-1)*this.totalItem,
      start:from,
      enddate:to,
      archive: this.archive,
      sort: this.sort,
      orderBy: this.orderBy,
      searchText:this.searchText
    }
    
    this.commonService._post('user-list',body,(res)=>{
      this.userList = res.users;
      
      
        this.totalPage=Math.ceil(res.totalUser/this.totalItem);
      //console.log(res);

      for (let index = 0; index < this.userList.length; index++) {
        const element = this.userList[index];
        this.action[element['_id']+'_status'] = element['status'];
        this.action[element['_id']+'_cmnt'] = element['comment'];
      }
      
   },(err)=>{

   });
  }

  filterUser() {
    this.getUserList(this.from, this.to)
  }

  navigate(userId){
    this.commonService._post('action-by-admin',{doc:{view:1},recordId:userId},(res)=>{
     
    },(err)=>{

    });
    
    // this.router.navigate([]).then(result => { window.open(`#/nominations;id=${userId}`, '_blank'); });
    window.open(`#/nominations;id=${userId}`, '_blank')
  }

  getEmployeeData(){
    this.commonService._get('getEmployeeData',res=>{
      this.employeeData=res
    },err=>{
      console.log(err);
      
    })
  }




onBlurMethod(val,id,type) {
  if (val.trim()) {
   let temp:any = {};
   temp[type] = val;
   
   
    this.commonService._post('action-by-admin',{doc:temp,recordId:id},(res)=>{
     
    },(err)=>{
          console.log(err);
    });
  }
}

deletePost(id){
  this.commonService._post('delete-data',{recordId:id,updateFlag:this.archive},(res)=>{
   // this.archive = !this.archive
   if(this.archive){
     this.getArchiveUsers();
   }else{
     this.getUserList(this.from, this.to);
   }
  },(err)=>{
        console.log(err);
  });
}

getArchiveUsers(){
  // if(!this.archive ){
  
  //     let limit= this.totalItem;
  //     let skip= (this.currentPage - 1) * this.totalItem;

  //   this.archive = true;
  //   this.commonService._get(`user-archive-list/${limit}/${skip}`,(res)=>{
  //     this.userList = res.users;
  //     this.totalPage = Math.round(res.totalUser / this.totalItem);
  //     console.log(res);
  //     for (let index = 0; index < res.length; index++) {
  //       const element = res[index];
  //       this.action[element['_id']+'_status'] = element['status'];
  //       this.action[element['_id']+'_cmnt'] = element['comment'];
  //     }
      
  //  },(err)=>{
  
  //  });
  // }else{
  //   this.archive = false;
  //   this.getUserList();
  // }
  if (this.archive) {
    this.archive = false
    this.getUserList(this.from, this.to);  
  }else{
    this.archive=true;
    this.getUserList(this.from, this.to);  
  }
  
}

setOrder(sort : string) {
  
  this.orderBy = this.orderBy === "ASC" ? "DESC" : "ASC";
  this.sort = sort;
  this.getUserList(this.from, this.to);
}

didModify() {
  this.getUserList(this.from, this.to);
}

previousPage(){
  if (this.currentPage > 1) {
    this.currentPage--;
    this.getUserList(this.from, this.to);
  }
}

onChangeLeadAssigned(event,id){

this.onBlurMethod(event.target.value,id,'leadAssigned')
}

onChangeLeadStatus(event,id){
  this.onBlurMethod(event.target.value,id,'leadStatus')


}
  nextPage(){
    if (this.currentPage <this.totalPage) {
      this.currentPage++;
      this.getUserList(this.from, this.to);
    }
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
