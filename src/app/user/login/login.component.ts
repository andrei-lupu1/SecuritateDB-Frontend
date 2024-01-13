import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  providers: [CookieService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private cookieService: CookieService,
              private userService: UserService,
              private toastrService: ToastrService,
              private router: Router,
              private accountService: AccountService) {}

  username = new FormControl<string>('', Validators.required);
  password = new FormControl<string>('', Validators.required);

  Login(){
    if(this.username.invalid || this.password.invalid){
      this.username.markAsTouched();
      this.password.markAsTouched();
      return;
    }
    else{
      this.userService.Login(this.username.value!,this.password.value!).subscribe({
        next: (response) => {
          if(response.succes){
            this.toastrService.success(response.message);
            this.cookieService.set('token', response.result);
            this.accountService.SuccessLogin(true);
            this.router.navigate(['/']);
          }
          else{
            this.toastrService.error(response.message);
          }
        }
      });
    }
  }
}
