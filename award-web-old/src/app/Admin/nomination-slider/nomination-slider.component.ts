import { literalMap } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-nomination-slider',
  templateUrl: './nomination-slider.component.html',
  styleUrls: ['./nomination-slider.component.css']
})
export class NominationSliderComponent implements OnInit {
nominationData:any;
  companyName:any
  companyLogo:any;
  productName:any;
  productLogo:any;
  archive=false;
  fileToUpload:any;
  sorting:any;
  id:any
  category:any;
  selectedCategory:any;
  editFlag:boolean=false;
  incomingArchive:any;
  errors:any;
  totalPage = 0;
  currentPage = 1;
  totalItem = 10;
  orderBy:string
  sort:string;
  searchText:string;
  constructor(public commonService:CommonService) { }

  ngOnInit() {
    this.getNominationSliderData(this.archive);
    this.getAllProductCategory();
    
  }

   handleFileInput(ev) {
    if(ev.target.files.length > 0){
      this.fileToUpload = ev.target.files[0];
      this.uploadImage(ev.target.id )

    }
  }

  uploadImage(id) {
   
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    this.commonService._post('upload-slider-img', formData, (res) => {
      console.log(res);
      if (id == 'companyLogo') {
        this.companyLogo = ('/uploads/' + res.fileName.split(".")[0] + ".webp").replace(/ /g, '');
      } else {
        if (id == 'productLogo') {
          this.productLogo = ('/uploads/' + res.fileName.split(".")[0] + ".webp").replace(/ /g, '');
        }

      }
    }, (err) => {
      console.log(err);
    });
  }

  EditFile(item){
    this.id=item._id;
    this.editFlag=true;
    this.companyName=item.companyName;
    this.companyLogo=item.companyLogo;
    this.productLogo=item.productLogo;
    this.productName=item.productName;
    this.selectedCategory=item.category
    this.incomingArchive=item.archive;
  
   
   

  }

  editSorting(e,id) {
    const nominationSliderData = {
      _id:id,
      sorting:parseInt(e.target.value)
     
    }
    this.commonService._post("editNominationSlider", nominationSliderData, res => {
      
      
      alert("Saved");

    }, err => {
      console.log(err);

    })
  }

  editNominationSlider(){
    const nominationSliderData = {
      _id: this.id,
      companyName: this.companyName,
      productName: this.productName,
      companyLogo: this.companyLogo,
      productLogo: this.productLogo,
      category: this.selectedCategory,
      archive: this.incomingArchive
     

     

    }
  
    
    this.commonService._post("_editNominationSlider", nominationSliderData, res => {
    

      alert("Saved");

    }, err => {
      console.log(err);

    })
  }



  getNominationSliderData(flag){
    const body={
      archive:flag,
      limit: this.totalItem,
      skip: (this.currentPage-1) * this.totalItem,
      sort: this.sort,
      orderBy: this.orderBy,
      searchText:this.searchText
    }
    this.commonService._post("getNominationSlider",body, res => {
      console.log(res);
      this.nominationData = res.result;
      this.totalPage = Math.ceil(res.pageTotal / this.totalItem);
      
      
    }, err => {
      console.log(err);

    })
  }



  saveNominationSlider(){
    const nominationSliderData={
      companyName: this.companyName,
      productName: this.productName,
      companyLogo: this.companyLogo,
      productLogo: this.productLogo,
      category:this.selectedCategory,
      sorting:  2001,
      archive:false
    }
    this.commonService._post("saveNominationSlider",nominationSliderData,res=>{
      console.log(res);
    if(res.status == 200) {
      document.getElementById("loginModal").classList.remove('show');
      document.getElementsByClassName("modal-backdrop")[0].classList.remove('show');
      
      this.errors = [];
      //document.getElementById("myCheck").click();
      alert("Saved!")
     
      
    }else {
      //console.log(res.error.errors);
    }
    
    },err=>{
      this.errors = err.error.errors
   
      
    })
  }

  getArchive(){
    if (this.archive) {
      this.archive = false
         this.getNominationSliderData(this.archive);
    }else{
      this.archive=true;
         this.getNominationSliderData(this.archive);
    }
  }


  deletePost(id){
    const body={
      id:id,
      archive:!this.archive?"":"archive"
    }
    this.commonService._post("archiveNominationSlider",body,res=>{

      this.getNominationSliderData(this.archive)
      
    },err=>{

      console.log(err);
      
    })

  }


  getAllProductCategory(){
    this.commonService._get("getAllproductCategory",res=>{
      this.category=res;
   
      
    },err=>{

    })
  }

  setOrder(sort : string) {
  
    this.orderBy = this.orderBy === "ASC" ? "DESC" : "ASC";
    this.sort = sort;
    this.getNominationSliderData(this.archive);
  }

  didModify() {
    this.getNominationSliderData(this.archive);
  }

  closeModal() {
    this.errors = [];

  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getNominationSliderData(this.archive);
      
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
      this.getNominationSliderData(this.archive);
    }
  }

}
