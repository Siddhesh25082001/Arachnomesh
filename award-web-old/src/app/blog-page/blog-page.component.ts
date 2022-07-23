import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  blogList: any = [];
  pageNo: number = 1;
  count: number = 0;
  constructor(public commonService: CommonService) { 
    this.getJuryList();
  }

  ngOnInit() {
  }
  
  getJuryList(){
    this.commonService._get('get-blog/'+this.pageNo+'/'+this.count,(res)=>{
      for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index];
        this.blogList.push(element);
      }
      this.count = res.count;
      this.pageNo = res.currentPage;
      console.log(this.blogList);
      
   },(err)=>{

   });
  }

  onScroll() {
    this.pageNo = this.pageNo  + 1;
    this.getJuryList();
  }
}
