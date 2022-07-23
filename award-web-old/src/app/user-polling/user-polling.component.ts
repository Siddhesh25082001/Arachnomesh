import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute, Router, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
@Component({
  selector: 'app-user-polling',
  templateUrl: './user-polling.component.html',
  styleUrls: ['./user-polling.component.css']
})
export class UserPollingComponent implements OnInit {
  dataSource:any = [];
  dumpData:any = {};
  page:boolean = true;
  selectionObj:any = {};
  headingTitle:any;
  searchText:string;
  searchPage :boolean = false;
  modalText:string;
  constructor(public commonService: CommonService,private activatedRoute: ActivatedRoute,private router: Router) {
   //console.log("path",this.router.url);
        this.activatedRoute.pathFromRoot[1].url.subscribe((val) => {
          console.log(val[1]);
          if(val[1]){
            console.log(val[1].path); 
            this.clientSearch(val[1].path);
          }else{
            this.getAwardsCategory();
          }
        });
   }

  ngOnInit(): void {
    // if(){

    // }else{

    // }
    if(!this.commonService.key){
      let key = uuidv4();
      localStorage.setItem("uuid",key);
      this.commonService.key = localStorage.getItem("uuid");
    }
  }
  
  clear(){
    this.searchPage = false;
    this.dumpData = {};
    this.dataSource = [];
    this.searchText = null;
    this.getAwardsCategory();
  }
///client-url/:company_name
  getAwardsCategory(){
    this.selectionObj = {};
    this.commonService._get('polling-awads',async (res)=>{
      this.dumpData = res;
      this.dataSource = Object.keys(res);
      console.log(this.dataSource);
      
    },(err)=>{

    });
  }

  openDemo(){
    console.log('show');
    
    let element: HTMLElement = document.getElementById('demo') as HTMLElement;
    //setTimeout(() => {
      element.click();
    //};
  }
  
  clientSearch(companyName){
    this.commonService._get(`client-url/${companyName}`,(res)=>{
        this.dumpData = res;
        this.dataSource = Object.keys(res);
       
        if(this.dataSource.length > 0){
          //console.log(this.dumpData);
          this.modalText = 'To vote for your favourite brand, click on the star below it';
          this.openDemo();
        }
        this.headingTitle = `Search result for - ${this.searchText}`;
        
        this.searchPage = true;
    },(err)=>{
        console.log(err);
    });
  }

  search(){
      this.commonService._post('search-product',{searchValue:this.searchText},(res)=>{
          this.dumpData = res;
          this.dataSource = Object.keys(res);
         
          if(this.dataSource.length > 0){
            //console.log(this.dumpData);
            this.modalText = 'To vote for your favourite brand, click on the star below it';
            this.openDemo();
          }
          this.headingTitle = `Search result for - ${this.searchText}`;
          
          this.searchPage = true;
      },(err)=>{
          console.log(err);
      });
  }
  

  polling(data,award){
    let temp:any = {};
    temp['id'] = data['_id'];
    temp['key'] = this.commonService.key;
    temp['award'] = award;
    if(typeof data.votes == "undefined"){
      temp['vote'] = 1; 
    }else{
      temp['vote'] = data.votes+1;
    }
    console.log(temp);
    
    this.commonService._post('vote-for-product',temp,(res)=>{
      console.log(res);
      if(res['msg']){
        this.modalText = 'You have already voted for this category!';
        this.openDemo();
      }else if(res['nModified'] == 0){
        this.modalText = 'One vote allowed at a time!!';
        this.openDemo();
      }
      else{
        this.modalText = 'Thank you for voting!';
        this.openDemo();
      }
    },(err)=>{
        console.log(err);
    });
  }


  getProduct(key){
    let temp:any = {};
    if(this.dumpData[key]['level'] == 'awardCategory'){
      this.selectionObj['awardCat'] = key;
      temp['id'] = this.dumpData[key]['awardCategory']['_id'];
      temp['apiType'] = 'awardCategory';
    }else if(this.dumpData[key]['level'] == 'productCategory'){
      this.selectionObj['proCat'] = key;
      temp['awardId'] = this.dumpData[key]['awardCategory'];
      temp['productCatId'] = this.dumpData[key]['productCategory']['_id'];
      temp['apiType'] = 'productCategory';
    }else if(this.dumpData[key]['level'] == 'productSubCategory'){
      this.selectionObj['productSubCat'] = key;
      temp['awardId'] = this.dumpData[key]['awardCategory'];
      temp['productCatId'] = this.dumpData[key]['productCategory'];
      temp['productSubCategoryId'] = this.dumpData[key]['productSubCategory']['_id'];
      temp['apiType'] = 'productSubCategory';
    }else if(this.dumpData[key]['level'] == 'productSubSubCategory'){
      this.selectionObj['productSubSubCat'] = key;
      temp['awardId'] = this.dumpData[key]['awardCategory'];
      temp['productCatId'] = this.dumpData[key]['productCategory'];
      temp['productSubCategoryId'] = this.dumpData[key]['productSubCategory'];
      temp['productSubSubCategoryId'] = this.dumpData[key]['productSubSubCategory']['_id'];
      temp['apiType'] = 'productSubSubCategory';
    }
   
    this.commonService._post('get-product-by-id',temp,(res)=>{
      this.dumpData = res;
     
      
      this.dataSource = Object.keys(res);
      if(this.dumpData[this.dataSource[0]]['level'] == 'Product'){
        console.log(this.selectionObj);
        let objKeys = Object.keys(this.selectionObj);
        let lKey = objKeys.length-1;
        this.headingTitle = this.selectionObj[objKeys[0]]+' - '+this.selectionObj[objKeys[lKey]];
        this.page = false;
        this.modalText = 'Just click the stars to vote your favourite brand';
        this.openDemo();
      }
      console.log(this.dumpData[this.dataSource[0]]['level']);
    },(err)=>{
      console.log(err);
    })
  }
}
