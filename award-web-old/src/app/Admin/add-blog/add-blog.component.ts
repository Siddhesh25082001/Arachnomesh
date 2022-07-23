import { Component, OnInit, ElementRef } from '@angular/core';
import { ConfigService } from '../config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
const formData = new FormData();
declare var Quill: any;

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  dataObj:any = {};
  fieldsKey = [];
  id: string;
  updateBtn:boolean;
  constructor(private _configService: ConfigService,private elRef:ElementRef,public commonService: CommonService,private router: Router,
    private activatedRoute: ActivatedRoute,) {
     this.id = activatedRoute.snapshot.url[1].path;
     if(this.id !== 'new'){
        this.updateBtn = true;
        this.getDataById();
     }
     this.commonService.refreshPageOnUrlChange().subscribe((data) => {
      this.dataObj = {};
      this.updateBtn = false;
     });
  }
 
  ngOnInit() {
  
 
  }
  
  getDataById(){
    this.commonService._post('get-by-id',{id:this.id},(res)=>{
        console.log(res);
        this.dataObj = res.blog[0];
    },(err)=>{
        
    });
  }


  handleFileInput(ev) {
    formData.delete('file');
    if(ev.target.files.length > 0){
      this.dataObj['file'] = ev.target.files[0]
    }
  }
  Save(){
  //  console.log(this.editorForm.get('editor').value);
   // console.log(this.doc);
  
   this.fieldsKey = Object.keys(this.dataObj);
   console.log(this.fieldsKey);
   if(this.fieldsKey.length > 5){
   let allowed = ["name","file","slug","sort","summery","doc"];
   for (let index = 0; index < allowed.length; index++) {
     formData.append(allowed[index],this.dataObj[allowed[index]]);
   }
          this.commonService._post('add-blog',formData,(res)=>{
            //
            for (let index = 0; index < this.fieldsKey.length; index++) {
              formData.delete(this.fieldsKey[index]);
            }
            this.dataObj =  {};
            this.router.navigate(["blog-list"]);
          },(err)=>{
              //this.dataObj =  {};
              for (let index = 0; index < this.fieldsKey.length; index++) {
                formData.delete(this.fieldsKey[index]);
              }
            console.log(err);
          });
  }else{
    alert("All fields are required")
  }
  }


  update(){
      this.fieldsKey = Object.keys(this.dataObj);
      console.log(this.fieldsKey);
      if(this.fieldsKey.length > 5){
      let allowed = ["name","file","slug","sort","summery","doc","_id"];
      for (let index = 0; index < allowed.length; index++) {
        formData.append(allowed[index],this.dataObj[allowed[index]]);
      }
              this.commonService._post('update-blog',formData,(res)=>{
                //
                for (let index = 0; index < this.fieldsKey.length; index++) {
                  formData.delete(this.fieldsKey[index]);
                }
                this.dataObj =  {};
                this.router.navigate(["blog-list"]);
              },(err)=>{
                  //this.dataObj =  {};
                  for (let index = 0; index < this.fieldsKey.length; index++) {
                    formData.delete(this.fieldsKey[index]);
                  }
                console.log(err);
              });
      }else{
        alert("All fields are required")
      }
  }


  }

