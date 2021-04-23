import { Injectable } from '@angular/core';
import {UserDto} from "../../dto/user-dto";

const TOKEN_KEY = 'AuthToken';
const ACCOUNT_NAME_KEY = 'AuthAccountName';
const USER_KEY = 'UserLogged';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  logOut() {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveTokenRemember(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    if (this.isRemember()) {
      return localStorage.getItem(TOKEN_KEY);
    } else {
      return sessionStorage.getItem(TOKEN_KEY)
    }
  }


  public saveAccountName(accountName: string) {
    window.sessionStorage.removeItem(ACCOUNT_NAME_KEY);
    window.sessionStorage.setItem(ACCOUNT_NAME_KEY, accountName);
  }

  public saveAccountNameRemember(accountName: string) {
    window.localStorage.removeItem(ACCOUNT_NAME_KEY);
    window.localStorage.setItem(ACCOUNT_NAME_KEY, accountName);
  }

  public getAccountName(): string {
    if (this.isRemember()) {
      return localStorage.getItem(ACCOUNT_NAME_KEY);
    } else {
      return sessionStorage.getItem(ACCOUNT_NAME_KEY)
    }
  }

  public isLogged(): boolean {
    return !(window.sessionStorage.getItem(TOKEN_KEY) == null && window.localStorage.getItem(TOKEN_KEY) == null);

  }

  public isRemember(): boolean {
    return window.localStorage.getItem(TOKEN_KEY) != null;
  }

  public saveUser(userDTO: UserDto) {
    window.localStorage.removeItem(USER_KEY)
    window.localStorage.setItem(USER_KEY, JSON.stringify(userDTO))
  }

  public getUser(): UserDto {
   return JSON.parse(window.localStorage.getItem(USER_KEY))
  }

}
