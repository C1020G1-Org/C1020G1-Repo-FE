import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class


serService {
  public API_USER = 'http://localhost:8080/user';
  public API_POST = 'http://localhost:8080/post';
  public API_COMMENT = 'http://localhost:8080/comment';
  constructor( private http: HttpClient) { }
  findUserById(id: number): Observable<any> {
      return this.http.get(this.API_USER + '/' + id);
  }

  findPostById(id: number): Observable<any> {
      return this.http.get(this.API_POST + '/' + id);
  }

  findCommentById(id: number): Observable<any> {
    return this.http.get(this.API_COMMENT + '/' + id);
  }
}
