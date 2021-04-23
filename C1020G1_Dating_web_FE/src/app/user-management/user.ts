export class user{
  userId: number;
  userName: string;
  gender: string;
  dateOfBirth: string;
  married: string;
  occupation: string;
  email: string;
  address: string;
  province: string;
  district: string;
  ward: string;


  constructor(userName: string, gender: string, dateOfBirth: string, married: string, occupation: string, email: string, address: string, province: string, district: string, ward: string) {
    this.userName = userName;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.married = married;
    this.occupation = occupation;
    this.email = email;
    this.address = address;
    this.province = province;
    this.district = district;
    this.ward = ward;
  }


}
