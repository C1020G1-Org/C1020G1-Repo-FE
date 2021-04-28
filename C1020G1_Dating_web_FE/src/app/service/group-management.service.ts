import { TokenStorageService } from './auth/token-storage';
import { Group } from '../model/group';
import { GroupWarning } from '../model/warning';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupUser } from "../model/group-user";
import { GroupRequest } from "../model/group-request";
import { User } from '../user-management/model/user-model';

@Injectable({
  providedIn: 'root'
})
/**
 * @author PhinNL
 * manage group by admin
 */
export class GroupManagementService {
  url = 'http://localhost:8080';
  groupId: number;
  constructor(private http: HttpClient, private router: Router, private tokenStorage: TokenStorageService) {
    tokenStorage.logOut();
    tokenStorage.saveUser(this.user);
  }

  getListMember(key: string, page: number): Observable<GroupUser[]> {
    return this.http.get<GroupUser[]>(this.url + '/member/list/' + this.groupId + '?key=' + key + '&page=' + page);
  }

  getListWarning(id: number, page: number): Observable<GroupWarning[]> {
    return this.http.get<GroupWarning[]>(this.url + '/member/warning/' + id + '?page=' + page);
  }

  getListRequest(key: string, page: number): Observable<GroupRequest[]> {
    return this.http.get<GroupRequest[]>(this.url + '/request/list/group/' + this.groupId + '?key=' + key + "&page=" + page);
  }

  getListInviteFriends(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/request/invite/friends/' + this.groupId + '?userId=' + this.userId);
  }

  getListInviteFriendsOfFriends(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/request/invite/list/' + this.groupId + '?userId=' + this.userId);
  }

  removeMember(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/member/delete/' + id);
  }

  getMember(id: number): Observable<GroupUser> {
    return this.http.get<GroupUser>(this.url + '/member/' + id);
  }

  acceptRequest(id: number): Observable<void> {
    return this.http.post<void>(this.url + '/request/accept/' + id, null);
  }

  deniedRequest(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/request/delete/' + id);
  }

  warningMember(warning: GroupWarning): Observable<void> {
    return this.http.post<void>(this.url + '/member/warning', warning);
  }

  getGroupById(): Observable<Group> {
    return this.http.get<Group>(this.url + '/group-detail/' + this.groupId);
  }

  inviteMember(groupRequest: GroupRequest): Observable<void> {
    return this.http.post<void>(this.url + '/request/save', groupRequest)
  }

  adminGroup() {
    let group: Group;
    this.getGroupById().subscribe(data => group = data, err => console.log(err), () => {
      if (group.admin.userId != this.userId) {
        this.navigate(404, '/');
      }
    })
  }

  navigate(status: number, url: string) {
    if (status == 404) {
      this.router.navigateByUrl(url);
    }
  }

  get userId() {
    return this.tokenStorage.getUser().userId;
  }

  get user(): User {
    return {
      "userId": 13,
      "userName": "Lê Quang Dương",
      "birthday": null,
      "gender": "Female",
      "occupation": "Test",
      "email": "duong@duong.duong",
      "userAvatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw4GNR2siRC9kCo-LYtqq0Ohcw_pH4d_rtdw&usqp=CAU",
      "userBackground": "abc",
      "marriaged": "yes",
      "ward": {
        "wardId": 1,
        "district": {
          "districtId": 1,
          "province": {
            "provinceId": 1,
            "provinceName": "Da Nang"
          },
          "districtName": "1"
        },
        "wardName": "1"
      },
      "address": "Hải Phòng",
      "status": {
        "statusId": 1,
        "statusName": "online"
      },
      "account": {
        "accountId": 5,
        "accountName": "5",
        "password": "5"
      }
    }
  }

  get defaultPage() {
    return {
      "content": [],
      "pageable": {
        "sort": {
          "sorted": false,
          "unsorted": true,
          "empty": true
        },
        "offset": 11,
        "pageNumber": 1,
        "pageSize": 11,
        "paged": true,
        "unpaged": false
      },
      "totalElements": 0,
      "totalPages": 0,
      "last": true,
      "size": 11,
      "number": 1,
      "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
      },
      "numberOfElements": 0,
      "first": false,
      "empty": true
    }
  }
}
