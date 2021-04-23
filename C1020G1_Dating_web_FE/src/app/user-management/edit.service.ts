import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {user} from "./user";

@Injectable({
  providedIn: 'root'
})
export class EditService {
  public API_URL: string = "http://localhost:8080/user";


  constructor(private httpClient: HttpClient) { }

  public findUserById(id: number): Observable<user> {
    return this.httpClient.get<user>(this.API_URL + '/' + id + '/' + "edit");
  }

  public updateUser(userId, user ): Observable<any>{
    return this.httpClient.post(this.API_URL + '/' + userId, user);
  }
}
