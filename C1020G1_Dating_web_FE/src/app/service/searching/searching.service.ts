import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {TokenStorageService} from "../auth/token-storage";

@Injectable({
  providedIn: 'root'
})
export class SearchingService {
  public API = 'http://localhost:8080/searching';
  public keySearch: string;
  httpOptions: any;
  public searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    public http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()
      })
      ,
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  doNameSearch(name): Observable<any> {
    return this.http.get(this.API + '/name-search/' + name, this.httpOptions);
  }

  doAdvancedSearch(name, birthday, favourites, province, gender): Observable<any> {
    return this.http.get(this.API + '/advanced-search?name=' + name +
      '&birthday=' + birthday +
      '&favourites=' + favourites +
      '&province=' + province +
      '&gender=' + gender, this.httpOptions);
  }

  getAllProvince(): Observable<any> {
    return this.http.get(this.API + '/province', this.httpOptions);
  }

  getAllRecommendation(id): Observable<any> {
    return this.http.get(this.API + '/recommend?id=' + id, this.httpOptions)
  }

  passKeySearch() {
    this.keySearch = this.searchTerm.value;
    return this.keySearch;
  }
}
