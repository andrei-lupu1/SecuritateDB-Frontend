import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';
import { ApiResponse } from '../shared/models/ApiResponse';
import { CourierService } from '../services/courier.service';
import { Vehicle } from '../shared/models/Vehicle';
import {MatSelectModule} from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Order } from '../shared/models/Order';
import { OrderCardComponent } from './order-card/order-card.component';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../services/customer.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddOrderDialogComponent } from './add-order-dialog/add-order-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSelectModule, OrderCardComponent, MatButtonModule, ReactiveFormsModule, MatDialogModule, AddOrderDialogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private accountService: AccountService,
              private userService: UserService,
              private courierService: CourierService,
              private customerService: CustomerService,
              private toastrService: ToastrService,
              public dialog: MatDialog) {}

  role: number = 0;
  vehicles!: Vehicle[];
  selectedVehicleId = new FormControl(0);
  orders!: Order[];
  isWorking = false;
  isLoggedIn!: boolean;

  ngOnInit(): void {
    this.getRole();
  }

  getRole(){
    this.accountService.isLoggedIn.subscribe({
      next: (loggedin) => {
        this.isLoggedIn = loggedin;
        if(this.isLoggedIn){
          this.userService.GetRole().subscribe({
            next: (response: ApiResponse) => {
              this.role = response.result;
              if(this.role == 2){
                this.getOrders();
                this.getAvailableVehicles();
                this.isCourierWorking();
              }
              else if(this.role == 3){
                this.getCustomerOrders();
              }
            }
          });
        }
      }
    });
  }

  openAddOrderDialog(): void{
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      width: '900px',
      data: {order: new Order(),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        this.customerService.addOrder(result as Order).subscribe({
          next: (response: ApiResponse) => {
            if(response.succes){
              this.toastrService.success(response.message);
              this.getCustomerOrders();
            }
          }
        });
      }
    });
  }

  getOrders(){
    this.courierService.GetOrdersForCourier().subscribe({
      next: (response: ApiResponse) => {
        this.orders = response.result as Order[];
      }
    });
  }

  getCustomerOrders(){
    this.customerService.getOrdersForCustomer().subscribe({
      next: (response: ApiResponse) => {
        this.orders = response.result as Order[];
      }
    });
  }

  getAvailableVehicles(){
    this.courierService.GetAvailableVehicles().subscribe({
      next: (response: ApiResponse) => {
        this.vehicles = response.result as Vehicle[];
      }
    });
  }

  isCourierWorking(){
    this.courierService.IsCourierWorking().subscribe({
      next: (response: ApiResponse) => {
        this.isWorking = response.result;
      }
    });
  }

  courierStartWorking(){
    if(!this.selectedVehicleId.value){
      this.selectedVehicleId.markAsTouched();
      this.toastrService.error("Please select a vehicle");
    }
    else{
      this.courierService.CourierStartWorking(this.selectedVehicleId.value).subscribe({
        next: (response: ApiResponse) => {
          if(response.succes){
            this.toastrService.success(response.message);
            this.isWorking = true;
          }
          else{
            this.toastrService.error(response.message);
          }
        }
      });
    }
  }

  courierFinishWorking(){
    this.courierService.CourierFinishWorking().subscribe({
      next: (response: ApiResponse) => {
        if(response.succes){
          this.toastrService.success(response.message);
        }
      }
    });
  }

  markOrderAsDone(orderId: number){
    this.courierService.MarkOrderAsDone(orderId).subscribe({
      next: (response: ApiResponse) => {
        if(response.succes){
          this.toastrService.success(response.message);
          this.getOrders();
        }
      }
    });
  }

}
