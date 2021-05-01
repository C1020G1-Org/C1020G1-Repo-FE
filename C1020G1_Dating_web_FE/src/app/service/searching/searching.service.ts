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
    private tokenStorage: TokenStorageService,
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

  doNameSearch(name, userId): Observable<any> {
    return this.http.get(this.API + '/name-search/?name=' + name +
      '&userId=' + userId, this.httpOptions);
  }

  doAdvancedSearch(name, birthday, favourites, province, occupation, gender, userId): Observable<any> {
    return this.http.get(this.API + '/advanced-search?name=' + name +
      '&birthday=' + birthday +
      '&favourites=' + favourites +
      '&province=' + province +
      '&occupation=' + occupation +
      '&gender=' + gender +
      '&userId=' + userId, this.httpOptions);
  }

  getAllProvince(): Observable<any> {
    return this.http.get(this.API + '/province', this.httpOptions);
  }

  getAllRecommendation(id): Observable<any> {
    return this.http.get(this.API + '/recommend?id=' + id, this.httpOptions);
  }

  getListFavourites(): Observable<any> {
    return this.http.get('http://localhost:8080/misc/favourites', this.httpOptions);
  }

  getListGroup(name, userId): Observable<any> {
    return this.http.get(this.API + '/group/?name=' + name +
      '&userId=' + userId, this.httpOptions);
  }

  passKeySearch(name) {
    this.keySearch = name;
  }

  getKeySearch() {
    return this.keySearch;
  }
}
