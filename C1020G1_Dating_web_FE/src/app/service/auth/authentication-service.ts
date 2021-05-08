import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtResponse} from "./JwtResponse";
import {Account} from "./account";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  loginUrl="http://localhost:8080/login"
  baseUrl="http://localhost:8080/oauth/"

  constructor(private http: HttpClient) { }

  sendLogin(account: Account): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, account, httpOptions);
  }

  google(jwtResponse: JwtResponse): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.baseUrl + "google", jwtResponse, httpOptions);
  }

  facebook(jwtResponse: JwtResponse): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.baseUrl + "facebook", jwtResponse, httpOptions);
  }


}
