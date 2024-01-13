import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private _role = new BehaviorSubject<number>(0);

  constructor(private cookieService: CookieService) { }

  SuccessLogin(succes: boolean){
    this._isLoggedIn.next(succes);
  }

  get isLoggedIn() {
    return this._isLoggedIn.asObservable();
}

  SetRole(role: number){
    this._role.next(role);
  }

  get role(){
    return this._role.asObservable();
  }

  getToken(){
    return this.cookieService.get('token');
  }

  removeToken(){
    return this.cookieService.delete('token');
  }
}
