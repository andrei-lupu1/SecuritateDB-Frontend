import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../shared/models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  private readonly baseUrl: string = environment.apiURL;
  private readonly getOrdersForCourierUrl: string = `/Courier/GetOrdersForCourier`;
  private readonly getAvailableVehiclesUrl: string = `/Courier/GetAvailableVehicles`;
  private readonly startWorkingUrl: string = `/Courier/StartWorking?vehicleId=`;
  private readonly markOrderAsDoneUrl: string = `/Courier/MarkOrderAsDone?orderId=`;
  private readonly isCourierWorking: string = `/Courier/IsCourierWorking`

  constructor(private _http: HttpClient) { }

  GetOrdersForCourier(){
    return this._http.get<ApiResponse>(`${this.baseUrl}${this.getOrdersForCourierUrl}`);
  }

  GetAvailableVehicles(){
    return this._http.get<ApiResponse>(`${this.baseUrl}${this.getAvailableVehiclesUrl}`);
  }

  StartWorking(vehicleId: number){
    return this._http.get<ApiResponse>(`${this.baseUrl}${this.startWorkingUrl}${vehicleId}`);
  }

  MarkOrderAsDone(orderId: number){
    return this._http.get<ApiResponse>(`${this.baseUrl}${this.markOrderAsDoneUrl}${orderId}`);
  }

  IsCourierWorking(){
    return this._http.get<ApiResponse>(`${this.baseUrl}${this.isCourierWorking}`);
  }
}
