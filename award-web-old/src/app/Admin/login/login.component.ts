import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent implements OnInit {
  userName: string; //'admin@channelier2020';
  password: string; //'ChanAward2@2@#';
  constructor(public router: Router, private commonService: CommonService) { }

  ngOnInit() {
  }

  login(){
    if(this.userName && this.password){
      if(this.userName == `admin@channelier2020`){
        this.commonService._post('admin/login-user',
        {email: this.userName, password: this.password},
        (res)=>{
          if (res.status) {
            localStorage.setItem("auth","ok");
            localStorage.setItem("_tk", res.token);
            this.router.navigate(['/admin-dashboard']);
          }else {
            alert(`Wrong Password or username`);
          }
        },
        (err)=>{
          alert(`Wrong Password or username`);
        })
      }else if(this.userName == 'superadminuser@awardchannelier.com'){
        //Super user login request
        this.commonService._post('admin/login-user',
        {email: this.userName, password: this.password},
        (res)=>{
          if (res.status) {
            localStorage.setItem('token', res.token);
            localStorage.setItem("auth","ok");
            this.router.navigate(['/admin-dashboard']);
          }else {
            alert(`Wrong Password or username`);
          }
        },
        (err)=>{
          alert(`Wrong Password or username`);
        })
      } else{
        alert(`Wrong Password or username`);
      }
    }else{
      alert(`This fields are required`);
    }
  }
}
