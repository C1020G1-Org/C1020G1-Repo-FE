import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) {

  }

  getAllFriendRequest(id : number): Observable<any>{
    return this.http.get('http://localhost:8080/friend_request' + '/' + id);
  }
}
