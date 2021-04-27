import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  public API_USER = 'http://localhost:8080/user';
  public API_ACCOUNT = 'http://localhost:8080/account';

  constructor(public http: HttpClient) {
  }

  updateStatusUser(userId: number, statusId: number): Observable<any> {
    return this.http.put(this.API_USER + '/' + userId + '/update/status/' + statusId, statusId);
  }

  updateAvatar(userId: number, image: string, filePath: string): Observable<any> {
    return this.http.put(this.API_USER + '/' + userId + '/update/avatar/?image=' + image + '&&imageFile=' + filePath, image);
  }

  updateBackground(userId: number, background: string, filePath: string): Observable<any> {
    return this.http.put(this.API_USER + '/' + userId + '/update/background/?background=' +
      background + '&&imageFile=' + filePath, background);
  }

  sendMailConfirmChangePassword(accountId: number, code: number): Observable<any> {
    return this.http.get(this.API_ACCOUNT + '/' + accountId + '/changePassword?code=' + code);
  }

  changePassword(accountName: string, oldPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.put(this.API_ACCOUNT + '/' + accountName + '/changePassword?oldPassword=' + oldPassword +
      '&&newPassword=' + newPassword + '&&confirmPassword=' + confirmPassword, newPassword);
  }

}
