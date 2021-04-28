import {Injectable} from '@angular/core';
import {Account, Favourite, Reason, Status, User, Ward} from "../../models/user-model";

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  private regis: boolean

  private _user: User = {
    userId: null,
    userName: "",
    birthday: null,
    gender: "",
    occupation: "",
    email: "",
    userAvatar: "",
    userBackground: "",
    marriaged: "",
    ward: <Ward>{
      wardId: 0,
      wardName: ""
    },
    address: "",
    status: <Status>{
      statusId: null,
      statusName: "",
    },
    account: null,
  };
  private _account: Account = {
    accountId: null,
    accountName: "",
    password: "",
  };

  private _favourites: Array<Favourite> = [];
  private _reason: Array<Reason> = [];
  private _reEmail: string = null;
  private _rePassword: string = null;
  private _district: number = null;
  private _province: number = null;
  private _termOfService: boolean = null;
  private _backgroundFile: any = null;
  private _avatarFile: any = null;
  private _avatar: string = null;
  private _background: string = null;
  private _serverError: any;

  get serverError(): any {
    return this._serverError;
  }

  set serverError(value: any) {
    this._serverError = value;
  }

  constructor() {
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get account(): Account {
    return this._account;
  }

  set account(value: Account) {
    this._account = value;
  }

  get favourites(): Array<Favourite> {
    return this._favourites;
  }

  set favourites(value: Array<Favourite>) {
    this._favourites = value;
  }

  get reason(): Array<Reason> {
    return this._reason;
  }

  set reason(value: Array<Reason>) {
    this._reason = value;
  }

  get reEmail(): string {
    return this._reEmail;
  }

  set reEmail(value: string) {
    this._reEmail = value;
  }

  get rePassword(): string {
    return this._rePassword;
  }

  set rePassword(value: string) {
    this._rePassword = value;
  }

  get district(): number {
    return this._district;
  }

  set district(value: number) {
    this._district = value;
  }

  get province(): number {
    return this._province;
  }

  set province(value: number) {
    this._province = value;
  }

  get termOfService(): boolean {
    return this._termOfService;
  }

  set termOfService(value: boolean) {
    this._termOfService = value;
  }


  get backgroundFile(): any {
    return this._backgroundFile;
  }

  set backgroundFile(value: any) {
    this._backgroundFile = value;
  }

  get avatarFile(): any {
    return this._avatarFile;
  }

  set avatarFile(value: any) {
    this._avatarFile = value;
  }

  get avatar(): string {
    return this._avatar;
  }

  set avatar(value: string) {
    this._avatar = value;
  }

  get background(): string {
    return this._background;
  }

  set background(value: string) {
    this._background = value;
  }

  private removeEmpty(obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] && typeof obj[key] === 'object') {
        const childObject = this.removeEmpty(obj[key]);
        if (childObject === undefined) {
          delete obj[key];
        }
      } else if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    });
    return Object.keys(obj).length > 0 || obj instanceof Array ? obj : undefined;
  };

  get backendObject() {
    return this.removeEmpty({user: this._user, account: this._account, favourites: this._favourites})

  }

  clear() {
    this._user = {
      userId: null,
      userName: "",
      birthday: null,
      gender: "",
      occupation: "",
      email: "",
      userAvatar: "",
      userBackground: "",
      marriaged: "",
      ward: <Ward>{
        wardId: null,
        wardName: ""
      },
      address: "",
      status: <Status>{
        statusId: null,
        statusName: "",
      },
      account: null,
    };
    this._account = {
      accountId: null,
      accountName: "",
      password: "",
    };
    this._favourites = [];
    this._reason = [];
    this._reEmail = null;
    this._rePassword = null;
    this._district = null;
    this._province = null;
    this._termOfService = null;
    this._backgroundFile = null;
    this._avatarFile = null;
    this._avatar = null;
    this._background = null;
    this._serverError = null;
  }

  isRegis() {
    return this.regis;
  }

  registed() {
    this.regis = true
  }

  clearRegis() {
    this.regis = false
  }

}
