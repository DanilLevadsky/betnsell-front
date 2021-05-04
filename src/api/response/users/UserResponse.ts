import {UserInfo} from '../../model/user/UserInfo';
import {Product} from '../../model/product/Product';
import {Auction} from '../../model/auction/Auction';

export class UserResponse {
  id: number;
  username: string;
  balance: number;
  profilePic: string;
  userInfo: UserInfo;
  products: Array<Product>;
  auctions: Array<Auction>;


  constructor(id: number, username: string, profilePic: string = null, balance: number = null, userInfo: UserInfo,
              products: Array<Product>, auctions: Array<Auction>) {
    this.id = id;
    this.username = username;
    this.profilePic = profilePic;
    this.userInfo = userInfo;
    this.products = products;
    this.profilePic = profilePic;
    this.balance = balance;
    this.auctions = auctions;
  }
}
