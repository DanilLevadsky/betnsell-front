import {UserInfo} from '../../model/user/UserInfo';

export class UserResponse {
  id: number;
  username: string;
  balance: number;
  profilePic: string;
  userInfo: UserInfo;


  constructor(id: number, username: string, profilePic: string = null, balance: number = null, userInfo: UserInfo) {
    this.id = id;
    this.username = username;
    this.profilePic = profilePic;
    this.userInfo = userInfo;
    this.profilePic = profilePic;
    this.balance = balance;

  }
}
