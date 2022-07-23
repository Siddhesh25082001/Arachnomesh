import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  public isAuthenticated(): boolean {
    const isAuth = localStorage.getItem('auth');
    if (isAuth == 'ok') {
      return true;
    }
    return false;
  }

  /**
   * Returns super admin access token, in future can be use for all type of access token
   */
  public getAdminAuthToken(): string {
    const token = localStorage.getItem('token');
    if (!token) {
      return '';
    }
    return token;
  }

  /**
   * Returns user access token
   */
  public getUserAuthToken(): string {
    const token = localStorage.getItem('_tk');
    if (!token) {
      return '';
    }
    return token;
  }

  /**
   * is current user have role `superAdmin`
   */
  isSuperAdmin(): boolean {
    const tk = localStorage.getItem('token');
    if (tk) {
      return true;
    }
    return false;
  }

  /**
   * returns current user have role
   */
  getUser() {
    const user = {
      role: localStorage.getItem('_rl'),
      id: localStorage.getItem('userId')
    };
    return user;
  }
}
