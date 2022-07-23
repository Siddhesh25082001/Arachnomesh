import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-admin-dashboard-header',
  templateUrl: './admin-dashboard-header.component.html',
  styleUrls: ['./admin-dashboard-header.component.css']
})
export class AdminDashboardHeaderComponent implements OnInit {

  constructor(public commonService:CommonService) { }

  ngOnInit() {
  }

}
