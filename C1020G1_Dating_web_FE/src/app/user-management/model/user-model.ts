export interface Province {
  provinceId: number;
  provinceName: string;
}

export interface District {
  districtId: number;
  province: Province;
  districtName: string;
}

export interface Ward {
  wardId: number;
  district: District;
  wardName: string;
}

export interface Status {
  statusId: number;
  statusName: string;
}

export interface Account {
  accountId: number;
  accountName: string;
  password: string;
}

export interface User {
  userId: number;
  userName: string;
  birthday: Date;
  gender: string;
  occupation: string;
  email:string;
  userAvatar: string;
  userBackground: string;
  marriaged: string;
  ward: Ward;
  address: string;
  status: Status;
  account: Account;
}

export interface Favourite {
  favouriteId: number;
  favouriteName: string;
}

export interface Reason {
  reasonId: number;
  reasonName: string;
}

