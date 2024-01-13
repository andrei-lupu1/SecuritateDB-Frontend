import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { UserService } from '../../services/user.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule,MatButtonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  constructor(private accountService: AccountService) { }
  isLoggedIn: any;
  token!: string;
  tokenData!: any;

  ngOnInit(): void {
    this.accountService.isLoggedIn.subscribe((data) => {
      this.isLoggedIn = data
      if(this.isLoggedIn){
        this.token = this.accountService.getToken();
        this.tokenData = jwtDecode(this.token);
      }
    });

  }

  Logout(){
    this.accountService.removeToken();
    this.accountService.SuccessLogin(false);
  }

}
