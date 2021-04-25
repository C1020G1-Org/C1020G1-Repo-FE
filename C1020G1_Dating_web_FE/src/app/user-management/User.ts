import {Province} from "./Province";
import {District} from "./District";
import {Ward} from "./Ward";

export class User{
  private _userId: number;
  private _userName: string;
  private _gender: string;
  private _dateOfBirth: string;
  private _married: string;
  private _occupation: string;
  private _email: string;
  private _address: string;
  private _province: Province;
  private _district: District;
  private _ward: Ward;


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

  get dateOfBirth(): string {
    return this._dateOfBirth;
  }

  set dateOfBirth(value: string) {
    this._dateOfBirth = value;
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
