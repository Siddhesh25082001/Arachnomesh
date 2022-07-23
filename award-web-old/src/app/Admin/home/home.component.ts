import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fileToUpload: File = null;
  name: string;
  email: string;
  phone: string;
  text: string;
  designation:string;
  sort: string;
  year: string;
  year1: string;
  year2: string;
  year3: string;
  juryList: any = [];
  disabled: boolean = false;
  queryFlag: string;
  currentId: string;
  file:string;
  brandImage: any;
  file2: any;
  website: any;
  archive = false;
  orderBy:string;

  totalPage = 0;
  currentPage = 1;
  totalItem = 10;
  constructor(public commonService: CommonService) { }

  ngOnInit() {
    this.getJuryList(this.archive);
  }
  
  getJuryList(flag){

    const body={
      limit: this.totalItem,
      skip: (this.currentPage - 1) * this.totalItem,
      archive: flag,
      year: this.year,
      sort: this.sort,
      orderBy: this.orderBy,
    }

    this.commonService._post('get-jury-for-admin',body,(res)=>{
      this.juryList = res.result;
      console.log(this.juryList);
      this.totalPage = Math.ceil(res.count / this.totalItem);
      //console.log(res);
      
   },(err)=>{

   });
  }

  handleFileInput(ev,imgType) {
    console.log(ev.target.files[0]);
    
    if(ev.target.files.length > 0){
      if(imgType == 'profile-img'){
        this.fileToUpload = ev.target.files[0];
      }else{
        this.brandImage = ev.target.files[0];
      }
    }
  }

  onSubmit() {
   console.log(this.queryFlag);
   let url;
   let t: any[] =[];
   if(this.year1) {
     t.push('2020');
   }
   if(this.year2) {
     t.push('2021');
   }
   if(this.year3) {
    t.push('2022');
  }
   const formData = new FormData();
   formData.append('file',this.fileToUpload);
   formData.append('brand',this.brandImage);
   formData.append('name',this.name);
   formData.append('email',this.email);
   formData.append('phone',this.phone);
   formData.append('text',this.text);
   formData.append('designation',this.designation);
   formData.append('sort',this.sort);
   formData.append('year', t.join());
   formData.append('website',this.website);
  if(this.queryFlag == 'insert') {
    url =  'add-jury';
  }else if(this.queryFlag == 'update'){
    url =  'update-jury';
    formData.append('id',this.currentId);
  }
   this.commonService._post(url,formData,(res)=>{
     
        this.getJuryList(this.archive);
    
   },(err)=>{
      console.log(err);
   });
  }

  action(type,data){
    console.log(type,data);
    if(type=="view"){
      this.clear();
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone; 
      this.text = data.description;
      this.file = data.file;
      this.file2 = data.brand;
      this.designation = data.designation;
      if(data.year.includes('2020')) {
        this.year1='2020';
      }
      if(data.year.includes('2021')) {
        this.year2='2021';
      }
      if(data.year.includes('2022')) {
        this.year3='2022';
      }
      this.sort = data.sort;
      this.website = data.website;
    }else if(type=="edit"){
      this.clear();
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone; 
      this.text = data.description;
      this.currentId = data._id;
      this.file = data.file;
      this.file2 = data.brand;
      this.designation = data.designation;
      this.sort = data.sort;
      if(data.year.includes('2020')) {
        this.year1='2020';
      }
      if(data.year.includes('2021')) {
        this.year2='2021';
      }
      if(data.year.includes('2022')) {
        this.year3='2022';
      }
      this.website = data.website;
    }else{
      console.log(data._id);
      
      this.deleteJury(data);
    }
  }

  clear(){
    this.name = null;
    this.email = null;
    this.phone =null;
    this.text = null;
    this.currentId = null;
    this.fileToUpload = null;
    this.file = null;
    this.file2 = null;
    this.year2=null;
    this.year3=null;
    this.year1=null;
    this.designation = null;
    this.sort = null;
    this.website = null;
  }
  

  deleteJury(juryId){
    this.commonService._post('delete-jury',{id:juryId},(res)=>{
      console.log(res);
      this.getJuryList(this.archive);
   },(err)=>{
      console.log(err);
   });
  }
  archiveJury(id){
    this.commonService._post('archive-jury',{recordId:id,updateFlag:this.archive},(res)=>{
     // this.archive = !this.archive
     this.getJuryList(this.archive);
    },(err)=>{
          console.log(err);
    });
  }
  getArchiveJuries(){
    // if(!this.archive){
    //   this.archive = true;
    //   this.commonService._get('archive-jury-for-admin',(res)=>{
    //     this.juryList = res;
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
    //   this.getJuryList(this.archive);
    

    // }
    if(this.archive) {
      this.archive = false
      this.getJuryList(this.archive);
    }else{
      this.archive=true;
      this.getJuryList(this.archive);
    }
  
  }

  filterYear() {
    this.getJuryList(this.archive);
  }

  setOrder(sort : string) {
  
    this.orderBy = this.orderBy === "ASC" ? "DESC" : "ASC";
    this.sort = sort;
    this.getJuryList(this.archive);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.getJuryList(this.archive);
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++
      this.getJuryList(this.archive);
    }
  }
}
