import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  PageName:any;
  Details:any = [];
  url:any = window.location.href;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,public commonService: CommonService) {
      this.PageName = activatedRoute.snapshot.url[1].path;
      //console.log(this.url);
      
     }

  ngOnInit() {
   
    this.getDetails();
    
  }
  
  getDetails(){
       this.commonService._post('blog-detail-page',{pageName:this.PageName},(res)=>{
          console.log(res);
          this.Details = res[0];
       },(err)=>{

       });
  }
}
