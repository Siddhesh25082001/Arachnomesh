import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-mockup-upload',
  templateUrl: './mockup-upload.component.html',
  styleUrls: ['./mockup-upload.component.css']
})
export class MockupUploadComponent implements OnInit {
  fileToUpload: any;

  constructor(public commonService: CommonService) { }

  ngOnInit() {
  }
  
  handleFileInput(ev) {
    if(ev.target.files.length > 0){
      this.fileToUpload = ev.target.files[0];
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('file',this.fileToUpload);
    this.commonService._post('upload-mockups',formData,(res)=>{
       console.log(res);
    },(err)=>{
        console.log(err);
    });
  }
}
