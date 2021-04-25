export class Province {
  private _provinceId: number;
  private _provinceName: string;

  get provinceId(): number {
    return this._provinceId;
  }

  set provinceId(value: number) {
    this._provinceId = value;
  }

  get provinceName(): string {
    return this._provinceName;
  }

  set provinceName(value: string) {
    this._provinceName = value;
  }
}
