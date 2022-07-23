import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Subject, Observable } from 'rxjs';
import { Router, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public refreshPageFlag = new Subject<any>();
  constructor(private http: HttpClient,public router: Router) { }
   key:any = localStorage.getItem('uuid');
  _post(api,body,success, failure) {
    this.http.post(`${environment.serverUrl}${api}`,body).subscribe((res) => {
      success(res);
    }, (err) => {
      failure(err);
    });
  }

  _get(api,success, failure) {
    this.http.get(`${environment.serverUrl}${api}`).subscribe((res) => {
      success(res);
    }, (err) => {
      failure(err);
    });
  }

  logout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    this.router.navigate(['admin']);
  }

  setWithExpiry(key, value, ttl) {
    const now = new Date()

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }

  refreshPageOnUrlChange() {
    return this.refreshPageFlag.asObservable();
  }

  setPageOnUrlChange(data) {
    return this.refreshPageFlag.next(data);
  }
}
