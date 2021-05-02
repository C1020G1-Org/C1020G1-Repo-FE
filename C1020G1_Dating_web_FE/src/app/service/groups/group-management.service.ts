
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TokenStorageService} from "../auth/token-storage";
import {GroupRequest} from "../../models/group_social";
import {AccountService} from "../auth/account-service";
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
  httpOptions;
  constructor(private http: HttpClient, private router: Router, private tokenStorage: TokenStorageService, private accountService: AccountService) {
    this.httpOptions = accountService.httpOptions;
  }
  getListMember(key: string, page: number): Observable<any> {
    return this.http.get<any>(this.url + '/member/list/' + this.groupId + '?key=' + key + '&page=' + page, this.httpOptions);
  }
  getListWarning(id: number, page: number): Observable<any> {
    return this.http.get<any>(this.url + '/member/warning/' + id + '?page=' + page, this.httpOptions);
  }
  getListRequest(key: string, page: number): Observable<any> {
    return this.http.get<any>(this.url + '/request/list/group/' + this.groupId + '?key=' + key + "&page=" + page, this.httpOptions);
  }
  getListInviteFriends(): Observable<any> {
    return this.http.get<any>(this.url + '/request/invite/friends/' + this.groupId + '?userId=' + this.userId, this.httpOptions);
  }
  getListInviteFriendsOfFriends(): Observable<any> {
    return this.http.get<any>(this.url + '/request/invite/list/' + this.groupId + '?userId=' + this.userId, this.httpOptions);
  }
  removeMember(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/member/delete/' + id, this.httpOptions);
  }
  getMember(id: number): Observable<any> {
    return this.http.get<any>(this.url + '/member/' + id, this.httpOptions);
  }
  acceptRequest(id: number): Observable<any> {
    return this.http.post<any>(this.url + '/request/accept/' + id, null, this.httpOptions);
  }
  deniedRequest(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/request/delete/' + id, this.httpOptions);
  }
  warningMember(warning: any): Observable<any> {
    return this.http.post<any>(this.url + '/member/warning', warning, this.httpOptions);
  }
  getGroupById(): Observable<any> {
    return this.http.get<any>(this.url + '/group-detail/' + this.groupId, this.httpOptions);
  }
  inviteMember(groupRequest: GroupRequest): Observable<any> {
    return this.http.post<any>(this.url + '/request/save', groupRequest, this.accountService.httpOptions);
  }
  adminGroup() {
    let group: any;
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
