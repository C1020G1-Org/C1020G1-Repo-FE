import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";

import {ErrorStateMatcher} from "@angular/material/core";
import {Subscription} from "rxjs";
import {SocialUser, FacebookLoginProvider, SocialAuthService} from "angularx-social-login";
import firebase from "firebase";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {TokenStorageService} from "../../service/auth/token-storage";
import {JwtResponse} from "../../service/auth/JwtResponse";
import {AuthenticationService} from "../../service/auth/authentication-service";
import {FriendRequestService} from "../../service/friends/friend-request.service";
import {MessageService} from "../../service/friends/message.service";


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];
  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  message1: string;
  subscription: Subscription;
  checkLogin = false;
  public formGroupName: any;
  public inputText = '';
  nickname = '';
  groupName = '';
  friend: any[];
  idFriend: any;
  id = '';
  displayedColumns: string[] = ['roomname'];
  rooms = [];
  members = [];
  isLoadingResults = true;
  socialUser: SocialUser;
  isCreateGroupChat = false;
  isAddMember = false;
  //chatroom
  @ViewChild('chatcontent') chatcontent: ElementRef;
  scrolltop: number = null;
  ref = firebase.database().ref('chats/');
  chatForm: FormGroup;
  addRoomName = '';
  roomname = '';
  getroom;
  message = '';
  users = [];
  chats = [];
  matcher = new MyErrorStateMatcher();
  styleChatBox = 'display: none';


  //
  constructor(
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public datePipe: DatePipe,
    public token: TokenStorageService,
    public friendRequestService: FriendRequestService,
    public authenticationService: AuthenticationService,
    public socialAuthService: SocialAuthService,
    public messageService: MessageService
  ) {

    // this.nickname = localStorage.getItem('nickname1');
    if (this.token.getUser() != null) {
      this.checkLogin = true;
      this.nickname = this.token.getUser().userName;
      this.id = (this.token.getUser().userId).toString();
    }

    // firebase.database().ref('roomusers/').orderByChild('nickname').equalTo()
    //Hiển thị ra danh sách room bằng id.
    firebase.database().ref('roomusers/').orderByChild('id').equalTo(this.id).on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      this.isLoadingResults = false;
    });

  }

  ngOnInit(): void {
    this.subscription = this.messageService.currentMessage.subscribe(message => this.message1 = message);

    this.formGroupName = this.formBuilder.group({
      roomname: [null, Validators.required]
    });

    if (this.token.getUser() === null) {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
        data => {
          this.socialUser = data;
          const tokenFacebook = new JwtResponse(this.socialUser.authToken);
          this.authenticationService.facebook(tokenFacebook).subscribe(
            res => {
              this.nickname = res.user.userName;
              this.id = (res.user.userId).toString();
              //Hien thi tin nhan
            });
        });

    } else {
      this.nickname = this.token.getUser().userName;
    }
    //Chatroom-----------
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
    //  ------------------

  }

  scrollBottom() {
    var objDiv = document.getElementById('parentDiv');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  //Chatroom--------------------------
  onFormSubmit(form: any) {
    const chat = form;
    chat.roomname = this.roomname;
    chat.nickname = this.nickname;
    chat.id = this.token.getUser().userId;
    chat.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.type = 'message';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });

  }

  exitChat() {
    const chat = {roomname: '', nickname: '', message: '', date: '', type: ''};
    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp: any) => {
      let roomuser = [];
      roomuser = snapshotToArray(resp);
      const user = roomuser.find(x => x.nickname === this.nickname);
      if (user !== undefined) {
        const userRef = firebase.database().ref('roomusers/' + user.key);
        userRef.update({status: 'offline'});
      }
    });

    this.router.navigate(['/roomlist']);
  }

  //----------------------------------

  logout(): void {
    localStorage.removeItem('nickname1');
    this.router.navigate(['/logintest']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  show(roomname,getroom) {
    firebase.database().ref('roomusers/').orderByChild('nickNameFriend').equalTo(this.token.getUser().userName).on('value', resp1 => {
      this.friend = snapshotToArray(resp1);
      this.idFriend = this.friend[0].id;
    });
    this.styleChatBox = 'position: fixed; bottom: 0px; right: 50px; width: 310px; height: 420px; display: block; z-index: 1000';
    this.id = (this.token.getUser().userId).toString();
    this.nickname = this.token.getUser().userName;
    const chat = {roomname: '', nickname: '', id: '', message: '', date: '', type: ''};
    //Chatroom--------------------------
    this.ref.orderByChild('roomname').equalTo(roomname).on('value', resp => {
      this.chats = [];
      this.id = (this.token.getUser().userId).toString();
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        this.chatcontent.nativeElement.scrollTop = this.chatcontent.nativeElement.scrollHeight;
      }, 500);
    });
    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp2: any) => {
      const roomusers = snapshotToArray(resp2);
      this.users = roomusers.filter(x => x.status === 'online');
    });
    this.roomname = roomname;
    this.getroom = getroom;
    //-------------------------------
  }

  close() {
    this.styleChatBox = 'display: none';
    this.isAddMember = false;
  }
}
