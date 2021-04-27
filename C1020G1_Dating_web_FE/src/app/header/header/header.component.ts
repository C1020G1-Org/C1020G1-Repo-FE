import {Component, OnInit, Output} from '@angular/core';
import Notification from "../../model/notification";
import {NotificationService} from "../../services/notification.service";
import {map} from "rxjs/operators";
import {FriendRequestService} from "../../services/friend-request.service";
import {FriendRequest} from "../../model/friend_request";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  notiList: Notification[];

  friendRequestHeader: FriendRequest;
  key: string;

  constructor(private friendRequestService: FriendRequestService
    , private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.setNotiList();
  }

  setNotiList() {
    this.notificationService.getAll(10).snapshotChanges().pipe( // 5 is userId is logged
      map(changes =>
        changes.map(data => ({key: data.payload.key, ...data.payload.val()})
        )
      )
    ).subscribe(data => {
      this.notiList = data;
      if (this.notiList.length > 10){
        let number = this.notiList.length - 10;
        this.notiList.splice(0,number);
      }
    });
  }


  sendIdFriendRequest(friendRequest: FriendRequest, key: string) {
    this.friendRequestHeader = friendRequest;
    this.key = key;
  }

  deleteFriendRequestInHeader() {
    this.friendRequestService.deleteFriendRequest
    (this.friendRequestHeader.receiveUser.userId, this.friendRequestHeader.sendUser.userId).subscribe();

    this.notificationService.delete(10, this.key);

    this.friendRequestService.deleteFriendRequestFE(this.friendRequestHeader.sendUser.userId);
    this.friendRequestService.setCheckFriendRequest2True();
    console.log(this.friendRequestService.getCheckFriendRequest2());
  }

  acceptFriendRequestInHeader(friendRequest: FriendRequest,key:string){
    this.friendRequestService.acceptFriendRequest(friendRequest).subscribe(data => {
      this.ngOnInit();
      this.notificationService.delete(10,key);
      this.friendRequestService.deleteFriendRequestFE(friendRequest.sendUser.userId);
    })
  }
}
