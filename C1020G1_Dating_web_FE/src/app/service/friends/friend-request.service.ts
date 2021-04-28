import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {Friends} from "../../models/friends";
import {FriendRequest} from "../../models/friend_request";
import Notification from "../../models/notification";
import {TokenStorageService} from "../auth/token-storage";


@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  friends: Friends[];
  friendsRequest: FriendRequest[];
  checkFriendRequest2: boolean = true;
  checkLoadMore: boolean;

  httpOptions:any;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer `+this.tokenStorage.getToken()})
      ,'Access-Control-Allow-Origin': 'http://localhost:4200','Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  createFriendRequest(friendRequest: FriendRequest): Observable<any> {
    return this.http.post('http://localhost:8080/friend_request', friendRequest, this.httpOptions);
  }

  findAllFriendRequest(idReceiverUser: number): Observable<any> {
    return this.http.get('http://localhost:8080/friend_request/' + idReceiverUser , this.httpOptions);
  }

  deleteFriendRequest(idReceiverUser: number, idSendUser: number): Observable<any> {
    console.log(idReceiverUser, idSendUser);
    return this.http.delete('http://localhost:8080/delete/friend_request/' + idReceiverUser + '/' + idSendUser , this.httpOptions);
  }

  acceptFriendRequest(friendRequest: FriendRequest): Observable<any> {
    console.log(friendRequest);
    return this.http.post('http://localhost:8080/addfriend', friendRequest , this.httpOptions);
  }

  getAllFriendOfUser(idUser: number): Observable<any> {
    return this.http.get('http://localhost:8080/friend-list/' + idUser , this.httpOptions);
  }

  unFriend(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/friend-delete/' + id , this.httpOptions );
  }

  findNotifyByFriendRequest(notiList: Notification[], friendRequest: FriendRequest): Notification {
    let notification = new Notification();
    for (let i = 0; i < notiList.length; i++) {
      if (notiList[i].friendRequest.sendUser.userId == friendRequest.sendUser.userId &&
        notiList[i].friendRequest.receiveUser.userId == friendRequest.receiveUser.userId) {
        notification = notiList[i]
      }
    }
    return notification;
  }

  saveListFriendRequest(listFriendsRequest) {
    this.friendsRequest = listFriendsRequest;
  }

  getListFriendRequest(numberSplice:number): FriendRequest[] {
    let friendRequest:FriendRequest[] = [];
    friendRequest = friendRequest.concat(this.friendsRequest);
    if (friendRequest.length <= numberSplice){
      this.checkLoadMore = false;
      return friendRequest;
    } else {
      this.checkLoadMore = true;
      friendRequest.splice(numberSplice);
      return friendRequest;
    }
  }

  getCheckLoadMore(){
    return this.checkLoadMore;
  }

  deleteFriendRequestFE(idSendUser : number){
    for(let i = 0 ; i < this.friendsRequest.length ; i++){
      if(this.friendsRequest[i].sendUser.userId == idSendUser){
        this.friendsRequest.splice(i,1);
      }
    }
  }

  setCheckFriendRequest2True(){
    this.checkFriendRequest2 = true;
  }

  setCheckFriendRequest2False(){
    this.checkFriendRequest2 = false;
  }

  getCheckFriendRequest2(): boolean{
    return this.checkFriendRequest2;
  }

  addFriendRequestFE(friendRequest: FriendRequest){
    this.friendsRequest.push(friendRequest);
  }
}
