import { Component } from '@angular/core';
import { CommonService } from './common.service';
//import { v4 as uuidv4 } from 'uuid';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'award-web';
  constructor(public commonService: CommonService) {
   
  }
}
