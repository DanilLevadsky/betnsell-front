export class UserChangeRequest {
  mobile: number;
  username: string;
  email: string;
  name: string;

  constructor(mobile: number, username: string, email: string, name: string) {
    this.mobile = mobile;
    this.username = username;
    this.email = email;
    this.name = name;
  }
}
