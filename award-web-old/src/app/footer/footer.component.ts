import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
//declare var any:JQuery;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  tandc = `${environment.domain}terms-use.html`;
  policy = `${environment.domain}privacy-policy.html`;
  constructor(private formBuilder: FormBuilder) { 
    
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      query: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });
  }

}
