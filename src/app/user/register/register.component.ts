import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RegisterPayload } from '../../shared/models/RegisterPayload';
import { UserService } from '../../services/user.service';
import { ApiResponse } from '../../shared/models/ApiResponse';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private userService: UserService,
              private router: Router,
              private toastr: ToastrService) {}

  confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value.Password === control.value.ConfirmPassword
      ? null
      : { PasswordNoMatch: true };
  };

  registerForm: FormGroup = new FormGroup({
    Username: new FormControl<string>('', Validators.required),
    Password: new FormControl<string>('', [Validators.minLength(3),Validators.required]),
    ConfirmPassword: new FormControl<string>('', [Validators.minLength(3),Validators.required]),
    Name: new FormControl<string>('',Validators.required),
    Email: new FormControl<string>('', [Validators.email,Validators.required]),
    PhoneNumber: new FormControl<string>('', Validators.required),
  },  this.confirmPasswordValidator);


 register(){
  if(this.registerForm.valid){
    var registerPayload : RegisterPayload = this.registerForm.value as RegisterPayload;
    this.userService.Register(registerPayload).subscribe({
      next: (response: ApiResponse) => {
        if(response.succes){
          this.toastr.success(response.message);
          this.router.navigate(['/login']);
        }
        else{
          this.toastr.error(response.message);
        }
      }
    });
  }
  else{
    this.registerForm.markAllAsTouched();
  }
 
 }

  get Username() {
    return this.registerForm.get('Username');
  }

  get Password() {
    return this.registerForm.get('Password');
  }

  get ConfirmPassword() {
    return this.registerForm.get('ConfirmPassword');
  }


  get Email() {
    return this.registerForm.get('Email');
  }

  get Name() {
    return this.registerForm.get('Name');
  }

  get PhoneNumber() {
    return this.registerForm.get('PhoneNumber');
  }


}
