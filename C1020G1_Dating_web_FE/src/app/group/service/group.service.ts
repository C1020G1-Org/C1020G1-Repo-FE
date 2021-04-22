import { GroupRequest } from './../../model/group-request';
import { GroupWarning } from './../../model/warning';
import { GroupUser } from './../../model/group-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupManagementService {
  url = 'http://localhost:8080/group/';
  groupId = 1;
  constructor(private http: HttpClient) {

  }

  getListMember(key: string, page: number): Observable<GroupUser[]> {
    return this.http.get<GroupUser[]>(this.url + 'member/list/' + this.groupId + '?key=' + key + '&page=' + page);
  }

  getListWarning(id: number, page: number): Observable<GroupWarning> {
    return this.http.get<GroupWarning>(this.url + 'member/warning/' + id + '?page=' + page);
  }

  getListRequest(key: string, page: number): Observable<GroupRequest[]> {
    return this.http.get<GroupRequest[]>(this.url + 'request/list/group/' + this.groupId + '?key=' + key + "&page=" + page);
  }

  getListInvite() { }

  removeMember(id: number): Observable<void> {
    return this.http.delete<void>(this.url + 'member/delete/' + id);
  }

  getMember(id: number): Observable<GroupUser> {
    return this.http.get<GroupUser>(this.url + 'member/' + id);
  }

  acceptRequest(id: number): Observable<void> {
    return this.http.post<void>(this.url + 'request/accept/' + id, null);
  }

  deniedRequest(id: number): Observable<void> {
    return this.http.delete<void>(this.url + 'request/delete/' + id);
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
