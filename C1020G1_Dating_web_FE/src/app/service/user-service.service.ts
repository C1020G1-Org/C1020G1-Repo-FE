import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "./auth/token-storage";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  httpOptions:any;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer `+this.tokenStorage.getToken()})
      ,'Access-Control-Allow-Origin': 'http://localhost:4200','Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  findUserById(id: number): Observable<any> {
      return this.http.get('http://localhost:8080/user/detail' + '/' + id , this.httpOptions );
  }

  findPostById(id: number): Observable<any> {
      return this.http.get('http://localhost:8080/post' + '/' + id , this.httpOptions );
  }
}
