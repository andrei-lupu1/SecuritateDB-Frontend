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
  private readonly courierStartWorkingUrl: string = `/Courier/CourierStartWorking?vehicleId=`;
  private readonly markOrderAsDoneUrl: string = `/Courier/MarkOrderAsDone?orderId=`;
  private readonly isCourierWorkingUrl: string = `/Courier/IsCourierWorking`
  private readonly courierFinishWorkingUrl: string = `/Courier/CourierFinishWorking`

  constructor(private _http: HttpClient) { }

  GetOrdersForCourier(){
    return this._http.get<ApiResponse>(`${this.baseUrl}${this.getOrdersForCourierUrl}`);
  }

  GetAvailableVehicles(){
    return this._http.get<ApiResponse>(`${this.baseUrl}${this.getAvailableVehiclesUrl}`);
  }

  CourierStartWorking(vehicleId: number){
    return this._http.get<ApiResponse>(`${this.baseUrl}${this.courierStartWorkingUrl}${vehicleId}`);
  }

  MarkOrderAsDone(orderId: number){
    return this._http.get<ApiResponse>(`${this.baseUrl}${this.markOrderAsDoneUrl}${orderId}`);
  }

  IsCourierWorking(){
    return this._http.get<ApiResponse>(`${this.baseUrl}${this.isCourierWorkingUrl}`);
  }

  CourierFinishWorking(){
    return this._http.get<ApiResponse>(`${this.baseUrl}${this.courierFinishWorkingUrl}`);
  }
}
