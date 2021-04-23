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
  getAllGroupMember():Observable<any>{
    return this.http.get((this.API + '/' + "member"))
  }
}
