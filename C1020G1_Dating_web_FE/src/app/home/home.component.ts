import { Component, OnInit } from '@angular/core';
import {User} from "../models/user-model";
import {TokenStorageService} from "../service/auth/token-storage";
import {SearchingService} from "../service/searching/searching.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  listRecommendation: any;

  constructor(private tokenStorage: TokenStorageService,
              private searchingService: SearchingService,) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser()
    this.searchingService.getAllRecommendation(this.user.userId).subscribe((data) => {
      this.listRecommendation = data;
    });
  }

  logout() {
    this.tokenStorage.logOut();
    window.location.reload();
  }
}
