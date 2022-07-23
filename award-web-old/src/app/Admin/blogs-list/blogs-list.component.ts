import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})
export class BlogsListComponent implements OnInit {


  blogList: any = [];

  constructor(public commonService: CommonService) { }

  ngOnInit() {
    this.getJuryList();
  }

  delete(id){
    this.commonService._get(`delete-blog/${id}`,(res)=>{
      this.blogList = res.BlogsList;
      console.log(res);
      this.getJuryList();
   },(err)=>{

   });
  } 

  getJuryList(){
    this.commonService._get('get-blog-list',(res)=>{
      this.blogList = res.BlogsList;
      console.log(res);
      
   },(err)=>{

   });
  }
}
