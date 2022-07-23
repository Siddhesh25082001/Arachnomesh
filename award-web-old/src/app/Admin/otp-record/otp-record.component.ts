import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-otp-record',
  templateUrl: './otp-record.component.html',
  styleUrls: ['./otp-record.component.css']
})
export class OtpRecordComponent implements OnInit {
  userList: any = [];
  archive: boolean = false;
  totalPage = 0;
  currentPage = 1;
  archivePagination = false;
  totalItem = 10;
  constructor(public commonService: CommonService, public router: Router) { }

  ngOnInit() {
    this.getUserList();
    
  }

  getUserList() {
    const body = {
      limit: this.totalItem,
      skip: (this.currentPage - 1) * this.totalItem,
    }

    this.commonService._post('otp-list',body, (res) => {
      this.userList = res.users;
      this.totalPage = Math.round(res.count / this.totalItem);
    }, (err) => {

    });
  }

  //changes in archive issue
  
  // deletePost(id) {
  //   console.log(id);
  //   console.log(this.archive);
  //   this.commonService._post('delete-data', { recordId: id, updateFlag: this.archive }, (res) => {
  //     // this.archive = !this.archive
  //     if (this.archive) {
  //       this.getArchiveUsers();
  //     } else {
  //       this.getUserList();
  //     }
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }
  // getArchiveUsers() {
  //   if (!this.archive) {
  //     this.archive = true;
  //     this.commonService._get('user-archive-list', (res) => {
  //       this.userList = res;
  //     }, (err) => {

  //     });
  //   } else {
  //     this.archive = false;
  //     this.getUserList();
  //   }

  //   //
  // }

  setMasterOTP(id,event,otp){
    let body={
      id:id,
      MasterOTP:event.target.value,
      otp:otp
    }
    this.commonService._post('setMaster-otp',body,(res) => {
      this.userList = res;
    }, (err) => {
      console.log(err);
      
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      // if (this.archive) {
      //   this.getArchiveUsers();
      // } else {
      //   this.getUserList();
      // }
      this.getUserList();
    }



  }
  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++
      // if (this.archive) {
      //   this.getArchiveUsers();
      // } else {
      //   this.getUserList();
      // }
      this.getUserList();
    }


  }
}
