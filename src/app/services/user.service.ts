import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPayload } from '../shared/models/RegisterPayload';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../shared/models/ApiResponse';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {



  private readonly baseUrl: string = environment.apiURL;
  private readonly registerUrl: string = '/Users/Register';
  private readonly loginUrl: string = '/Users/Login?username='; 
  private readonly roleUrl: string = '/Users/GetRole';

  constructor(private _http: HttpClient,
              private CookieService: CookieService) { }

  Register(registerPayload: RegisterPayload) {
    return this._http.post<ApiResponse>(`${this.baseUrl}${this.registerUrl}`, registerPayload);
  }

  Login(username: string, password: string) {
    return this._http.get<ApiResponse>(`${this.baseUrl}${this.loginUrl}${username}&pass=${password}`);
  }

  GetRole(){
    return this._http.get<ApiResponse>(`${this.baseUrl}${this.roleUrl}`);
  }
}
