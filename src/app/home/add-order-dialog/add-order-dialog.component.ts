import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../../shared/models/Order';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonService } from '../../services/common.service';
import { County } from '../../shared/models/County';

@Component({
  selector: 'app-add-order-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './add-order-dialog.component.html',
  styleUrl: './add-order-dialog.component.scss'
})
export class AddOrderDialogComponent implements OnInit {

  paymentMethods = [
    {
      Id: 1,
      Name: 'Cash'
    },
    {
      Id: 2,
      Name: 'Card'
    }
  ];

  counties!: County[];
  countyId!: number;
  orderForm: FormGroup = new FormGroup({
    Description: new FormControl<string>('', Validators.required),
    Ammount: new FormControl<number>(0, Validators.required),
    PaymentMethodId: new FormControl<number>(0, Validators.required),
    RecipientName: new FormControl<string>('', Validators.required),
    RecipientPhone: new FormControl<string>('', Validators.required),
    RecipientEmail: new FormControl<string>('', Validators.required),
    Address: new FormControl<string>('', Validators.required),
    ZipCode: new FormControl<number>(0, Validators.required),
    CountyId: new FormControl<number>(0, Validators.required),
    CityId: new FormControl<number>(0, Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<AddOrderDialogComponent>,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.getCounties();
  }

  getCounties() {
    this.commonService.getCounties().subscribe(response => {
      if (response.succes) {
        this.counties = response.result;
      }
    });
  }

  findInvalidControls() {
    const invalid = [];
    const controls = this.orderForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  close() {
    this.dialogRef.close();
  }

  addOrder() {
    if (!this.orderForm.valid) {
      this.orderForm.markAllAsTouched();
      return;
    }
    else {
      this.dialogRef.close(this.orderForm.value);
    }
  }
}
