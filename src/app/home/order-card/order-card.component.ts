import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Order } from '../../shared/models/Order';
import { CourierService } from '../../services/courier.service';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTableModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
  @Input() order!: Order;
  @Input() isWorking!: boolean;
  @Output() orderDoneOutput: EventEmitter<number> = new EventEmitter<number>();
  displayedColumns: string[] = ['status', 'statusDate', 'location'];

  constructor(private courierService: CourierService,
              private toastrService: ToastrService) { }

  markOrderAsDone(orderId: number){
    this.orderDoneOutput.emit(orderId);
  }
}
