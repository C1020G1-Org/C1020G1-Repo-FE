import {District} from "./District";

export class Ward {
  private _wardId: number;
  private _districtId: District;
  private _wardName: string;

  get wardId(): number {
    return this._wardId;
  }

  set wardId(value: number) {
    this._wardId = value;
  }

  get districtId(): District {
    return this._districtId;
  }

  set districtId(value: District) {
    this._districtId = value;
  }

  get wardName(): string {
    return this._wardName;
  }

  set wardName(value: string) {
    this._wardName = value;
  }
}
