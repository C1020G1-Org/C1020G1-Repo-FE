import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../service/auth/account-service";
import {TokenStorageService} from "../../service/auth/token-storage";
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

  }
}
