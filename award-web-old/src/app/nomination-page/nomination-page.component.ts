import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-nomination-page',
  templateUrl: './nomination-page.component.html',
  styleUrls: ['./nomination-page.component.css']
})
export class NominationPageComponent implements OnInit {
limit=10;
currentPage=1;
totalPage=0;
all_nomination:any;
firstLoad=true;
startNumber=0;
lastNumber=0;
category:any;
searchCategory:any="all";
  numbers: Array<any> = [];
  constructor(public dataService:CommonService) { }

  ngOnInit() {
    this.getAllNomination();
    this.getAllProductCategory();
  }

  getAllNomination(){

    this.dataService._get(`getUserNewSliderWithNomination/${this.limit}/${this.currentPage}/${this.searchCategory}`,res=>{
      this.totalPage=Math.ceil(res.count/this.limit)
   
     
      
      // this.totalPage=50;
     
      if (this.searchCategory!="all") {
      
        if (this.totalPage < 10) {
          this.lastNumber = this.totalPage
          this.numbers = [];
        
          for (let index = this.startNumber; index <= this.lastNumber; index++) {
            this.numbers.push(index);

          }
        

        }
      }
    
      this.all_nomination=res.sliderData;
      if (this.currentPage !=this.totalPage) {
        if (this.firstLoad) {
          this.startNumber = 1;
          if (this.totalPage < 10 ) {
            this.lastNumber=this.totalPage
            
          }else{
            this.lastNumber = 10
          }
         
        }


        if (this.currentPage == this.lastNumber && this.totalPage != 1) {
          
          this.numbers = [];
          this.startNumber = this.startNumber + 10;
          this.lastNumber = this.lastNumber + 10;
         
          for (let index = this.startNumber; index <= this.lastNumber; index++) {
            this.numbers.push(index);

          }
        }
        if (this.firstLoad) {
          for (let index = this.startNumber; index <= this.lastNumber; index++) {
            this.numbers.push(index);

          }
        
        }

        this.firstLoad = false;


        
      }
      if (this.currentPage==1) {
        let firstElement:HTMLElement=document.getElementById("1");
        if (firstElement) {
          firstElement.classList.add("active")
        }
      }

  
    },err=>{

    })
  }
  previousPage() {
    if (this.currentPage > 1) {
      document.getElementById(this.currentPage.toString()).classList.remove("active");
      this.currentPage--
     
      document.getElementById(this.currentPage.toString()).classList.add("active");
      this.getAllNomination()
    }
  
      window.scrollTo(0,0);
    

   


  }
  nextPage() {
   
    if (this.currentPage < this.totalPage) {
     let prePage=document.getElementById(this.currentPage.toString());
     if (prePage) {
       prePage.classList.remove("active");
       
     }
      this.currentPage++
     
     let nextPage=document.getElementById(this.currentPage.toString());

      if (nextPage) {
        nextPage.classList.add("active");

      }
      this.getAllNomination()
    }
    window.scrollTo(0, 0);
   
  }


  setPage(page){
   
    let SetPage:any = document.getElementById(this.currentPage.toString());
    console.log(SetPage);
    
    if (SetPage != null ) {
      SetPage.classList.remove("active");
    }
    this.currentPage=page;
   let newSetPage=document.getElementById(this.currentPage.toString());
   if (newSetPage!= null) {
     newSetPage.classList.add("active");
   }
    this.getAllNomination();
    window.scrollTo(0, 0);
   
  }

  searchByCategory(cat){
    let catElement=document.getElementById(this.searchCategory);
    if (catElement) {
      catElement.classList.remove("active")
      
    }
    this.searchCategory = cat;
    document.getElementById(this.searchCategory).classList.add("active")
    
    this.currentPage = 1;
    this.getAllNomination();
   

  }


  getAllProductCategory() {
    this.dataService._get("getAllproductCategory", res => {
      this.category = res;
      this.category.push({"productName":"All Categories"})
      console.log(this.category);

    }, err => {

    })
  }

  getSerialNumber(i){
    if (this.currentPage > 2) {
     return i+(10*(this.currentPage-1))
   }else{
     if (this.currentPage==2) {
       return i+10;
     }else{
     return i;
     }
   }
  }

}
