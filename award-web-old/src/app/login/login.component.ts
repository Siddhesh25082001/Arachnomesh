import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from './../common.service';
import { HostListener } from '@angular/core';
import { environment } from './../../environments/environment';
import { from } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @HostListener('window:beforeunload', ['$event'])
  public loginCredential: any = { phoneNumber: '', OTP: '' };
  public OTPHtmlFlag = 0;
  public query = this.route.snapshot.paramMap.get('query') || 'insert';
  public number = this.route.snapshot.paramMap.get('no') || null;
  public userId = localStorage.getItem("userId");
  public role = localStorage.getItem('_rl');
  interval: any;
  timeLeft: number;
  resendFlag = 0;
  rememberMe: any;
  error = '';
  tempOTP: any = '';
  mySubscription: any;
  inval: any;
  constructor(public commonService: CommonService, private route: ActivatedRoute, public router: Router) {
    //console.log(environment);
    if (this.number) {
      this.loginCredential.phoneNumber = this.number;
    }
    //  const
    //console.log(this.userId, this.number);

    //console.log(this.userId);
    if (this.userId && (this.query != 'update-number')) {
      if (this.role === 'user') {
        window.location.href = `${environment.domain}register.html`;
      } else {
        this.router.navigate(['/jury-dashboard']);
      }
    }
  }

  ngOnInit() {


    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
    // console.log(environment.domain);
  }

  verifyOTP() {
    this.commonService._post('verify-otp', { number: this.loginCredential.phoneNumber, OTP: this.loginCredential.OTP }, (res) => {

      if (res.status == 1) {
        this.commonService._post('user-login', { phone: this.loginCredential.phoneNumber, query: this.query, id: this.userId, hash: res.hash }, async (res) => {
          if (res.status === -1) {
            alert('Not valid credentials, please try again');
            return;
          }
          //console.log(res);
          if (res.user._id) {
            localStorage.setItem("userId", res.user._id);
            localStorage.setItem("_tk", res.token);
            localStorage.setItem("_rl", res.user.role);
            if (res.user.role === 'jury') {
              this.router.navigate(['/jury-dashboard']);
            } else if (res.user.role === 'user') {
              window.location.href = `${environment.domain}register.html`;
            }
            if (!localStorage.getItem('submit')) {
              localStorage.setItem('submit', 'done');
            }
          } else if (res.nModified) {
            this.router.navigate(['/user-dashboard'])
          }
        }, (err) => {

        });
      } else {
        this.error = res.msg;
      }
    }, (err) => {
      console.log(err);
    });
  }


  sendOTP() {
    if (this.loginCredential.phoneNumber.length == 10) {
      this.inval = false;
      //console.log(this.query);
      let query: string;
      if (this.query == 'update-number') {
        query = 'update-number';
      } else {
        query = 'send-otp';
      }
      this.startTimer();
      this.commonService._post(query, { number: this.loginCredential.phoneNumber }, (res) => {
        if (res.status) {
          this.tempOTP = res.otp;
          this.OTPHtmlFlag = 1;
          this.error = '';
        } else if (res.msg) {
          this.error = res.msg;
        }
      }, (err) => {
        console.log(err);
      })
    } else {
      this.inval = true;
    }


  }
  backToLogin() {
    this.OTPHtmlFlag = 0;
    this.tempOTP = '';
  }

  valid() {
    // if(this.loginCredential.phoneNumber.length === 1){
    if ((this.loginCredential.phoneNumber.length < 10) && (this.loginCredential.phoneNumber.length > 1)) {
      this.inval = true;
    } else {
      this.inval = false;
    }
    //}
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        //console.log(this.timeLeft);
        if (this.timeLeft === 0) {
          this.resendFlag = 1;
          this.pauseTimer();
        }
      } else {
        this.timeLeft = 30;
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  copyText() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.tempOTP;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
