import {ShortAuctionResponse} from '../../response/auctions/ShortAuctionResponse';

export class Product {
  title: string;
  userId: number;
  description: string;
  photo: string;
  id: number;
  auction: ShortAuctionResponse;

  constructor(title: string, userId: number, description: string, photo: string, id: number, auction: ShortAuctionResponse) {
    this.title = title;
    this.userId = userId;
    this.description = description;
    this.photo = photo;
    this.id = id;
    this.auction = auction;
  }
}
