import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FriendRequest} from "../model/friend_request";
import {Observable} from "rxjs";
import {Friends} from "../model/friends";
import {TokenStorageService} from "../service/auth/token-storage";

@Injectable({
  providedIn: 'root'
})
export class WallService {

  friends: Friends[];

  httpOptions:any;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer `+this.tokenStorage.getToken()})
      ,'Access-Control-Allow-Origin': 'http://localhost:4200','Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  createFriendRequest(friendRequest: FriendRequest): Observable<any> {
    console.log(friendRequest);
    return this.http.post('http://localhost:8080/friend_request', friendRequest, this.httpOptions);
  }

  findAllFriendRequest(idReceiverUser: number): Observable<any> {
    return this.http.get('http://localhost:8080/friend_request/' + idReceiverUser,this.httpOptions)
  }

  deleteFriendRequest(idFriendRequest: number): Observable<any>{
    console.log(this.friends);
    return this.http.delete('http://localhost:8080/delete/friend_request/' + idFriendRequest,this.httpOptions);
  }

  acceptFriendRequest(friendRequest: FriendRequest): Observable<any>{
    console.log(friendRequest);
    return this.http.post('http://localhost:8080/addfriend',friendRequest,this.httpOptions);
  }

  getAllFriendOfUser(idUser: number): Observable<any>{
    return this.http.get('http://localhost:8080/friend-list/' + idUser,this.httpOptions);
  }

  unFriend(id: number): Observable<any>{
    return this.http.delete('http://localhost:8080/friend-delete/' + id,this.httpOptions);
  }

  getUser(userId: any) {
    return this.http.get('http://localhost:8080/user/detail/' + userId,this.httpOptions);
  }


}
