import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../login/auth/account-service";
import {TokenStorageService} from "../../login/auth/token-storage";
import {Router} from "@angular/router";
import {UserDto} from "../../dto/user-dto";
import {WardDto} from "../../dto/ward-dto";
import {StatusDto} from "../../dto/status-dto";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  userDTO: UserDto;


  constructor(private accountService: AccountService,
              private tokenStorage: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {

    // this.accountService.errorPage().subscribe(data => {
    //   this.userDTO = data
    //   this.tokenStorage.saveUser(this.userDTO)
    //   console.log(this.tokenStorage.getUser())
    // })
  }

  logout() {
    this.tokenStorage.logOut();
    this.router.navigateByUrl("/login")
  }
}
