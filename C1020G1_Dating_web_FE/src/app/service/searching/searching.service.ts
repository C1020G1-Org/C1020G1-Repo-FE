import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchingService {
  public API = 'http://localhost:8080/searching';
  constructor(
    public http: HttpClient
  ) { }

  doNameSearch(name): Observable<any> {
    return this.http.get(this.API + '/name-search/' + name);
  }

  doAdvancedSearch(name, gender): Observable<any> {
    return this.http.get(this.API + '/name-search?name=' + name + '&gender=' + gender);
  }
}
