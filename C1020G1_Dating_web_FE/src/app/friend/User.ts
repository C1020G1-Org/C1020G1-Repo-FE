export class User {
  userId:number;
  userName: string;
  birthday: string;
  gender: string;
  occupation: string;
  address: string;
  email: string;
  userAvatar: string;
  userBackground: string;
  marriaged: string;


  constructor(userId: number, userName: string, birthday: string, gender: string, occupation: string, address: string, email: string, userAvatar: string, userBackground: string, marriaged: string) {
    this.userId = userId;
    this.userName = userName;
    this.birthday = birthday;
    this.gender = gender;
    this.occupation = occupation;
    this.address = address;
    this.email = email;
    this.userAvatar = userAvatar;
    this.userBackground = userBackground;
    this.marriaged = marriaged;
  }
}


