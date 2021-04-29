import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "../auth/token-storage";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private API: string = 'http://localhost:8080/friend-list';
  private API_DELETE: string = 'http://localhost:8080/friend-delete'
  private API_SUGGEST: string = 'http://localhost:8080/friend-suggest'



  httpOptions:any;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer `+this.tokenStorage.getToken()})
      ,'Access-Control-Allow-Origin': 'http://localhost:4200','Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  public getAllFriend(id: number, pageNumber: number): Observable<any>{
    return this.http.get(this.API + '/' + id + '?page=' + pageNumber,this.httpOptions)
  }

  public deleteFriend(friendId: number): Observable<any> {
    return this.http.delete(this.API_DELETE + '/' + friendId,this.httpOptions);
  }

  public getAllFriendSuggest(userId: number): Observable<any> {
    return this.http.get(this.API_SUGGEST + '/' + userId,this.httpOptions);
  }
}
