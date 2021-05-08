import {Component, OnInit} from '@angular/core';
import {SuggestFriend} from "../models/SuggestFriend";
import {FriendService} from "../service/friends/friend.service";
import {User} from "../models/user-model";
import {TokenStorageService} from "../service/auth/token-storage";
import {FriendRequest} from "../models/friend_request";
import {FriendRequestService} from "../service/friends/friend-request.service";
import Notification from "../models/notification";
import {NotificationService} from "../service/friends/notification.service";


@Component({
  selector: 'app-friend-suggest',
  templateUrl: './friend-suggest.component.html',
  styleUrls: ['./friend-suggest.component.css']
})
export class FriendSuggestComponent implements OnInit {

  mutualFriend: string;

  userLogging: User;

  public suggestFriend: SuggestFriend[];

  constructor(
    private friendService: FriendService,
    private tokenStorage: TokenStorageService,
    private friendRequestService: FriendRequestService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {

    this.userLogging = this.tokenStorage.getUser();

    this.findAllFriendSuggest();

  }

  getMutualFriend(mutualFriends: User[]) {
    this.mutualFriend = "";
    for (let i = 0; i < mutualFriends.length; i++) {
      if (i < 10) {
        this.mutualFriend += mutualFriends[i].userName + "<br>"
      } else {
        this.mutualFriend += "end more" + (mutualFriends.length - 1) + "people";
        break;
      }
    }
  }

  createFriendRequest(friendSuggest: any) {

    let friendRequest: FriendRequest = {
      sendUser: this.userLogging,
      receiveUser: friendSuggest.suggestFriend
    };
    this.friendRequestService.createFriendRequest(friendRequest).subscribe(data => {
      this.ngOnInit();
      this.noti(friendRequest);
    });
  }

  noti(friendRequest: FriendRequest) {
    let notification = new Notification();
    notification.friendRequest = friendRequest;
    this.notificationService.create(notification, friendRequest.receiveUser.userId);
  }

  findAllFriendSuggest(){
    this.friendService.getAllFriendSuggest(this.userLogging.userId).subscribe( data => {
      if(data != null){
        this.friendService.saveFriendSuggestFE(data);
        this.suggestFriend = this.friendService.getFriendSuggestFE();
      }
    })
  }
}
