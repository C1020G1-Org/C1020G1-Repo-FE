import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {GroupManagementService} from "./group-management.service";
import {AccountService} from "../auth/account-service";
import {GroupSocial} from "../../models/group_social";
@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private API: string = 'http://localhost:8080/group';
  httpOptions;
  constructor(public http: HttpClient, private groupManager: GroupManagementService, private accountService: AccountService) {
    this.httpOptions = accountService.httpOptions;
  }
  editGroup(group: GroupSocial) {
    return this.http.put(this.API + '-edit/' + group.groupId, group, this.httpOptions);
  }
  getAllGroup(pageNumber: number, key: string): Observable<any> {
    return this.http.get(this.API + '?page=' + pageNumber + '&key=' + key, this.httpOptions);
  }
  getGroupById(groupId): Observable<any> {
    return this.http.get(this.API + '-detail/' + groupId, this.httpOptions);
  }
  deleteGroup(groupId): Observable<any> {
    return this.http.delete(this.API + '-delete/' + groupId, this.httpOptions);
  }
  getGroupByName(groupName): Observable<any> {
    return this.http.get(this.API + '-search/' + groupName, this.httpOptions);
  }
  getAllMemberGroup(groupId, pageNumber: number): Observable<any> {
    return this.http.get(this.API + '-member/' + groupId + '?page=' + pageNumber, this.httpOptions);
  }
  getGroupUserByGroupIdAndUserId(groupId, userId) {
    return this.http.get(this.API + '-detail/' + groupId + '/' + userId, this.httpOptions);
  }
  saveRequest(groupRequest) {
    return this.http.post('http://localhost:8080/request/save', groupRequest, this.httpOptions);
  }
  getAllGroupRequest(userId) {
    return this.http.get("http://localhost:8080/request/list/user/" + userId, this.httpOptions);
  }
}
