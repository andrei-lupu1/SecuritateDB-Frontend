import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './common/navigation/navigation.component';
import { UserService } from './services/user.service';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  token!: string;

  constructor(private accountService: AccountService) {
    this.token = this.token = this.accountService.getToken();
    if(this.token){
      this.accountService.SuccessLogin(true);
    }
  }
  title = 'SecuritateDB';
}
