import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../shared/models/ApiResponse';
import { Order } from '../shared/models/Order';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly baseUrl: string = environment.apiURL;
  private readonly getOrdersForCustomerUrl: string = `/Customer/GetOrdersForCustomer`;
  private readonly addOrderUrl: string = `/Customer/AddOrder`;

  constructor(private _http: HttpClient) { }

  getOrdersForCustomer(){
    return this._http.get<ApiResponse>(`${this.baseUrl}${this.getOrdersForCustomerUrl}`);
  }

  addOrder(order: Order){
    return this._http.post<ApiResponse>(`${this.baseUrl}${this.addOrderUrl}`, order);
  }
}
