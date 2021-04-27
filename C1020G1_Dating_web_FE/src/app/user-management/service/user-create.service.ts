import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserCreateService {
  public API_USER = 'http://localhost:8080/user'
  public API_MISC = 'http://localhost:8080/misc'

  constructor(public http: HttpClient) {
  }

  public getAllProvinces(): Observable<any> {
    return this.http.get(this.API_MISC + '/' + 'province');
  }

  public getDistrictByProvince(provinceId): Observable<any> {
    return this.http.get(this.API_MISC + '/district/' + provinceId);
  }

  public getWardByDistrict(districtId): Observable<any> {
    return this.http.get(this.API_MISC + '/ward/' + districtId);
  }

  public getFavourites(): Observable<any> {
    return this.http.get(this.API_MISC + '/favourites')
  }

  public createUser(obj): Observable<any> {
    return this.http.post(this.API_USER + '/create',obj)
  }


}
