import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserCreateService {
  public API_USER = 'http://localhost:8080/user'
  public API_FAVOURITE = 'http://localhost:8080/favourite'
  public API_LOCATION = 'http://localhost:8080/location'

  constructor(public http: HttpClient) {
  }

  public getAllProvinces(): Observable<any> {
    return this.http.get(this.API_LOCATION + '/' + 'province');
  }

  public getDistrictByProvince(provinceId): Observable<any> {
    return this.http.get(this.API_LOCATION + '/district/' + provinceId);
  }

  public getWardByDistrict(districtId): Observable<any> {
    return this.http.get(this.API_LOCATION + '/ward/' + districtId);
  }

}
