import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  public API: string = 'http://localhost:8080/group';
  constructor(public http: HttpClient) {}

  getAllGroup(): Observable<any> {
    return this.http.get(this.API);
  }

  getGroupById(groupId): Observable<any>{
    return this.http.get(this.API + '-detail/'+ groupId);
  }

  deleteGroup(groupId): Observable<any>{
    return this.http.delete(this.API+ '-delete/'+groupId);
  }

  getGroupByName(groupName): Observable<any>{
    return this.http.get(this.API + '-search/'+ groupName);
  }

  getAllMemberGroup(groupId): Observable<any>{
    return this.http.get(this.API+'-member/'+ groupId);
  }
}
