import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Order } from '../../shared/models/Order';
import { CourierService } from '../../services/courier.service';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
  @Input() order!: Order;

  constructor(private courierService: CourierService,
              private toastrService: ToastrService) { }

  markOrderAsDone(orderId: number){
    this.courierService.MarkOrderAsDone(orderId).subscribe({
      next: (response) => {
        if(response.succes){
          this.toastrService.success(response.message);
        }
        else{
          this.toastrService.error(response.message);
        }
      }
    });
  }
}
