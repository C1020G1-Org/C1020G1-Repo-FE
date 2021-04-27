import {Ward} from "./Ward";
import {District} from "./District";
import {Province} from "./Province";

export class User {

  private _userId: number;
  private _userName: string;
  private _gender: string;
  private _birthday: string;
  private _married: string;
  private _occupation: string;
  private _email: string;
  private _address: string;
  private _ward: Ward;
  private _district: District;
  private _province: Province;


  get district(): District {
    return this._district;
  }

  set district(value: District) {
    this._district = value;
  }

  get province(): Province {
    return this._province;
  }

  set province(value: Province) {
    this._province = value;
  }

  get ward(): Ward {
    return this._ward;
  }

  set ward(value: Ward) {
    this._ward = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  get birthday(): string {
    return this._birthday;
  }

  set birthday(value: string) {
    this._birthday = value;
  }

  get married(): string {
    return this._married;
  }

  set married(value: string) {
    this._married = value;
  }

  get occupation(): string {
    return this._occupation;
  }

  set occupation(value: string) {
    this._occupation = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

}
