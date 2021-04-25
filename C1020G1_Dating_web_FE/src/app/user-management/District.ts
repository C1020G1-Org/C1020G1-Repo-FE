import {Province} from "./Province";

export class District {
  private _districtId: number;
  private _provinceId: Province;
  private _districtName: string;


  get districtId(): number {
    return this._districtId;
  }


  get districtName(): string {
    return this._districtName;
  }
}
