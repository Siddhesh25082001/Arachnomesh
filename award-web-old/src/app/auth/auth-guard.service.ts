import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (state.url.includes('edit-nomination')) {
      //only accessible by super admin
      if (!this.auth.isSuperAdmin()) {
        this.router.navigate(['admin']);
        return false;
      }
    }
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['admin']);
      return false;
    }
    return true;
  }
}
