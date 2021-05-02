import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {RegistrationComponent} from "../registration/registration.component";
import {UserStorageService} from "./user-storage.service";



@Injectable({
  providedIn: 'root'
})
export class RegisGuardService implements CanActivate {

  constructor(private router: Router,
              private userStorage: UserStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userStorage.isRegis())
      return true;

    this.router.navigate(['registration']);
    return false;

  }

}
