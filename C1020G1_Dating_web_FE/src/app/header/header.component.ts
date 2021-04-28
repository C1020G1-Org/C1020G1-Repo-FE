import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {SearchingService} from "../service/searching/searching.service";
import {TokenStorageService} from "../service/auth/token-storage";
import {User} from "../models/user-model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  displayStatus: string;

  constructor(private searchingService: SearchingService,
              private router: Router,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    console.log(this.user.status)
    if (this.user.status.statusId == 1) {
      this.displayStatus = "status f-online"
    }
    if (this.user.status.statusId == 2) {
      this.displayStatus = "status f-away"
    }
    if (this.user.status.statusId == 3) {
      this.displayStatus = "status f-offline"
    }
  }

  search(event: any) {
    this.searchingService.searchTerm.next(event.target.value);
    // this.searchingService.getKeySearch(event.target.value);
    this.router.navigateByUrl('/name-search')
  }

  logout() {
    this.tokenStorage.logOut();
    this.router.navigateByUrl("/login")
  }
}
