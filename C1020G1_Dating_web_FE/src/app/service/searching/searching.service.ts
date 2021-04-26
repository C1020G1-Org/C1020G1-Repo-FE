import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchingService {
  public API = 'http://localhost:8080/searching';
  public keySearch: string;
  public searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  constructor(
    public http: HttpClient
  ) { }

  doNameSearch(name): Observable<any> {
    return this.http.get(this.API + '/name-search/' + name);
  }

  doAdvancedSearch(name, birthday): Observable<any> {
    return this.http.get(this.API + '/advanced-search?name=' + name +
      '&birthday=' + birthday);
  }

  // doAdvancedSearch(name, gender): Observable<any> {
  //   return this.http.get(this.API + '/name-search?name=' + name + '&gender=' + gender);
  // }

  // getKeySearch(name) {
  //   this.keySearch = name;
  // }

  passKeySearch() {
    this.keySearch = this.searchTerm.value;
    return this.keySearch;
  }
}
