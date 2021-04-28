import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from "../../service/auth/token-storage";
import {User, Ward} from "../../models/user-model";

@Injectable({
  providedIn: 'root'
})
export class EditService {
  public API_USER = 'http://localhost:8080/user';
  public API_ACCOUNT = 'http://localhost:8080/account';

  httpOptions:any;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer `+this.tokenStorage.getToken()})
      ,'Access-Control-Allow-Origin': 'http://localhost:4200','Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  updateStatusUser(userId: number, statusId: number): Observable<any> {
    return this.http.put(this.API_USER + '/' + userId + '/update/status/' + statusId, statusId,this.httpOptions);
  }

  updateAvatar(userId: number, image: string, filePath: string): Observable<any> {
    return this.http.put(this.API_USER + '/' + userId + '/update/avatar/?image=' + image + '&&imageFile=' + filePath, image, this.httpOptions);
  }

  updateBackground(userId: number, background: string, filePath: string): Observable<any> {
    return this.http.put(this.API_USER + '/' + userId + '/update/background/?background=' +
      background + '&&imageFile=' + filePath, background, this.httpOptions);
  }

  sendMailConfirmChangePassword(email: string, code: number): Observable<any> {
    return this.http.get(this.API_ACCOUNT + '/' + email + '/changePassword?code=' + code, this.httpOptions);
  }

  changePassword(accountName: string, oldPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.put(this.API_ACCOUNT + '/' + accountName + '/changePassword?oldPassword=' + oldPassword +
      '&&newPassword=' + newPassword + '&&confirmPassword=' + confirmPassword, newPassword, this.httpOptions);
  }

  public updateUser(userId, user ): Observable<any>{
    return this.http.put(this.API_USER + '/' + 1, user,this.httpOptions);
  }

  public getWard(): Observable<any>{
    return this.http.get(this.API_USER + '/ward',this.httpOptions);
  }

  public getDistrict(): Observable<any>{
    return this.http.get(this.API_USER + '/district',this.httpOptions);

  }

  public getProvince(): Observable<any>{
    return this.http.get(this.API_USER + '/province',this.httpOptions);

  }

}
