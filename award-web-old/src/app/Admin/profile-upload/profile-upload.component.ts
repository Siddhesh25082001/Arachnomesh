import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-profile-upload',
  templateUrl: './profile-upload.component.html',
  styleUrls: ['./profile-upload.component.css']
})
export class ProfileUploadComponent implements OnInit {
employeeData:any;
fileToUpload:any;
employeeImage:any;
employeeName:any;
designation:any;
editData:any;
editFlag:boolean=false;
id:any;
  constructor(public dataService:CommonService) { }

  ngOnInit() {
    this.getEmployeeData();
  }

  getEmployeeData(){
    this.dataService._get('getEmployeeData',res=>{
      this.employeeData=res
      console.log(this.employeeData);
      
    },err=>{

    })
  }

  handleFileInput(ev) {
    if (ev.target.files.length > 0) {
      this.fileToUpload = ev.target.files[0];
      this.employeeImage = ('/uploads/' + this.fileToUpload["name"].split(".")[0] + ".webp").replace(/ /g, '');
      this.uploadImage()

    }
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    this.dataService._post('upload-employee-img', formData, (res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

  postEmployeeData(){
    let employeeData={
      employeeName:this.employeeName,
      employeeImage:this.employeeImage,
      designation:this.designation
    }
    this.dataService._post('add-profile',employeeData,res=>{
      console.log(res);
      
    },err=>{
      console.log(err);
      
    })
    
  }

  editProfile(data){
    this.editFlag=true;
    this.employeeName = data.employeeName;
    this.employeeImage = data.employeeImage;
    this.designation = data.designation;
    this.id=data._id;
    
   
   

 
  }

  editEmployeeProfile() {   
    this.editData = {
      id: this.id,
      employeeName: this.employeeName,
      employeeImage: this.employeeImage,
      designation: this.designation
    }
    console.log(this.editData);
    
    this.dataService._post('edit-profile', this.editData, res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

}
