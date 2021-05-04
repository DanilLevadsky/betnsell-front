export class RegRequest {
  email: string;
  username: string;
  password: string;
  mobile: string;
  profilePic: string;
  name: string;

  constructor(email: string, username: string, password: string, mobile: string = null, profilePic: string = null, name: string = null){
    this.email = email;
    this.username = username;
    this.password = password;
    this.mobile = mobile;
    this.profilePic = profilePic;
    this.name = name;
  }
}
