import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../shared/models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private readonly baseUrl: string = environment.apiURL;
  private readonly getCountiesUrl: string = '/Catalogs/GetCounties';

  constructor(private _http: HttpClient) { }

  getCounties() {
    return this._http.get<ApiResponse>(`${this.baseUrl}${this.getCountiesUrl}`);
  }
}
