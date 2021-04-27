import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor( private http: HttpClient) { }
  findUserById(id: number): Observable<any> {
      return this.http.get('http://localhost:8080/user' + '/' + id);
  }

  findPostById(id: number): Observable<any> {
      return this.http.get('http://localhost:8080/post' + '/' + id);
  }
}
