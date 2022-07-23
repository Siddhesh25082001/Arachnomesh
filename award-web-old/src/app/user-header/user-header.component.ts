import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit, OnDestroy {
  home = environment.domain;
  href: string;
  mySubscription: any;
  isLogin: any = localStorage.getItem('userId') || null;
  ind=localStorage.getItem('_rl')==='jury' ? 'jury' : 'user';
  constructor(private router: Router) {

    // console.log(this.router.url);
  }

  ngOnInit() {
    this.href = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('registration');
    localStorage.removeItem('_tk');
    localStorage.removeItem('_rl');
    window.location.href = `${environment.domain}index.html`;
  }

  gocategory() {
    window.location.href = `${environment.domain}award-category.html`;
  }

  goToIndex() {
    window.location.href = `${environment.domain}index.html#section-tickets`;
  }

  goToBenefit() {
    window.location.href = `${environment.domain}index.html#benefit-sec`;
  }

  goToPartner() {
    window.location.href = `${environment.domain}index.html#section-sponsors`;
  }

  goTo2020() {
    window.location.href = `${environment.domain}winner.html`;
  }

  goabout() {
    window.location.href = `${environment.domain}index.html#section-about`;
  }

  gofooter() {
    window.location.href = `${environment.domain}index.html#footer`;
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
