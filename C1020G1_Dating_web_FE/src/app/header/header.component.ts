import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../service/auth/token-storage";
import {SearchingService} from "../service/searching/searching.service";
import {User} from "../user-management/model/user-model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  keySearch: any;
  user: User;

  constructor(private searchingService: SearchingService,
              private router: Router,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
  }

  search(keySearch: any) {
    // this.router.navigate(['/name-search'],{queryParams:{search: keySearch}})
    this.router.navigate(['/name-search/'], )
  }

  logout() {
    this.tokenStorage.logOut();
    this.router.navigateByUrl("/login")
  }
}
