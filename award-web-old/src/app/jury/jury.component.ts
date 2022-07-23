import { query } from '@angular/animations';
import {ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.css']
})
export class JuryComponent implements OnInit {
  
  juryList: any = [];
  pageNo: number = 1;
  count: number = 0;
  selected: string = "2021";
  archive: boolean = false;
  scrollCallback;
  constructor(public commonService: CommonService, private route: ActivatedRoute) {
    this.route.params.subscribe(event => {
      this.selected = event.year;
      this.getJuryList(this.selected);
     });
  }

  ngOnInit(): void {
  }

  getJuryList(year: string){
    this.commonService._get('get-jury/'+this.pageNo+'/'+this.count+'/'+year,(res)=>{
      console.log(res);
      for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index];
        this.juryList.push(element);
      }
      this.count = res.count;
      this.pageNo = res.currentPage;
   },(err)=>{

   });
  }

  onScroll() {
    this.pageNo = this.pageNo  + 1;
    this.getJuryList(this.selected);
  }

  toggleSelected() {
    if(this.selected==='2021'){
      this.selected='2020';
    }
    else {
      this.selected='2021';
    }
    this.juryList=[];
    this.pageNo=1;
    this.getJuryList(this.selected)
  }
}
