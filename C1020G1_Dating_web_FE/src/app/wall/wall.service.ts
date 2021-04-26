import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FriendRequest} from "../model/friend_request";
import {Observable} from "rxjs";
import {Friends} from "../model/friends";

@Injectable({
  providedIn: 'root'
})
export class WallService {

  friends: Friends[];

  constructor(private http: HttpClient) {
  }

  createFriendRequest(friendRequest: FriendRequest): Observable<any> {
    return this.http.post('http://localhost:8080/friend_request', friendRequest);
  }

  findAllFriendRequest(idReceiverUser: number): Observable<any> {
    return this.http.get('http://localhost:8080/friend_request/' + idReceiverUser)
  }

  deleteFriendRequest(idFriendRequest: number): Observable<any>{
    console.log(this.friends);
    return this.http.delete('http://localhost:8080/delete/friend_request/' + idFriendRequest);
  }

  acceptFriendRequest(friendRequest: FriendRequest): Observable<any>{
    console.log(friendRequest);
    return this.http.post('http://localhost:8080/addfriend',friendRequest);
  }

  getAllFriendOfUser(idUser: number): Observable<any>{
    return this.http.get('http://localhost:8080/friend-list/' + idUser);
  }

  unFriend(id: number): Observable<any>{
    return this.http.delete('http://localhost:8080/friend-delete/' + id);
  }
}
