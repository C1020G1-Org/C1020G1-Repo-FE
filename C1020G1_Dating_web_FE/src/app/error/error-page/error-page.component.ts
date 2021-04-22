import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../login/auth/account-service";
import {TokenStorageService} from "../../login/auth/token-storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor(private accountService: AccountService,
              private tokenStorage: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.accountService.errorPage().subscribe(data => {
      console.log(this.tokenStorage.getAccountName())
    })
  }

  logout() {
    this.tokenStorage.logOut();
    this.router.navigateByUrl("/login")
  }
}
