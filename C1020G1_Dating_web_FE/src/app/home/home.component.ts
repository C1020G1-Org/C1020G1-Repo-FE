import { Component, OnInit } from '@angular/core';
import {User} from "../models/user-model";
import {TokenStorageService} from "../service/auth/token-storage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser()
  }

  logout() {
    this.tokenStorage.logOut();
    window.location.reload();
  }
}
