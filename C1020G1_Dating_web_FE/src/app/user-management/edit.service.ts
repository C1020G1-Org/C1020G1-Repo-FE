import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./User";
import {Ward} from "./Ward";

@Injectable({
  providedIn: 'root'
})
export class EditService {
  public API_URL: string = "http://localhost:8080/user";

  httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
      , 'Access-Control-Allow-Origin': 'localhost:8080', 'Access-Control-Allow-Methods': '*'
    };
  }


  public findUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(this.API_URL + '/' + 1);
  }

  public updateUser(userId: number, user): Observable<any> {
    return this.httpClient.put(this.API_URL + '/edit/' + userId, user);
  }

  public getWard(): Observable<any> {
    return this.httpClient.get(this.API_URL + '/ward');
  }

  public getDistrict() {
    return this.httpClient.get(this.API_URL + '/district');

  }

  public getProvince() {
    return this.httpClient.get(this.API_URL + '/province');
  }

}
