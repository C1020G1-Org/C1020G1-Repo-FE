import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private API: string = 'http://localhost:8080/friend-list';
  private API_DELETE: string = 'http://localhost:8080/friend-delete'
  private API_SUGGEST: string = 'http://localhost:8080/friend-suggest'

  constructor(public http: HttpClient) { }

  public getAllFriend(id: number, pageNumber: number): Observable<any>{
    return this.http.get(this.API + '/' + id + '?page=' + pageNumber)
  }

  public deleteFriend(friendId: number): Observable<any> {
    return this.http.delete(this.API_DELETE + '/' + friendId);
  }

  public getAllFriendSuggest(userId: number): Observable<any> {
    return this.http.get(this.API_SUGGEST + '/' + userId);
  }
}
