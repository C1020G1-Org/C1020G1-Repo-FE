import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  public API: string = 'http://localhost:8080/group';
  constructor(public http: HttpClient) {}

  getAllGroup(pageNumber: number): Observable<any> {
    return this.http.get(this.API + '?page=' + pageNumber);
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

  getAllMemberGroup(groupId, pageNumber: number): Observable<any>{
    return this.http.get(this.API+'-member/'+ groupId + '?page=' + pageNumber);
  }

  getGroupUserByGroupIdAndUserId(groupId,userId){
    return this.http.get(this.API + '-detail/'+groupId+'/'+userId);
  }

  saveRequest(groupRequest){
    console.log(groupRequest.group)
    return this.http.post( 'http://localhost:8080/request/save' , groupRequest);
  }

  getAllGroupRequest(userId){
    return this.http.get(this.API+"-request/"+userId);

  }
}
