import {Product} from '../../model/product/Product';
import {Ticket} from '../../model/auction/Ticket';
import {AuctionStatus} from '../../model/auction/AuctionStatus';

export class ShortAuctionResponse {
  id: number;
  product: Product;
  createdAt: string;
  lotFinishDate: string;
  lotExpireDate: string;
  totalPrice: number;
  status: AuctionStatus;

  constructor(id: number, createdAt: string, lotFinishDate: string, lotExpireDate: string, product: Product, totalPrice: number,
              status: AuctionStatus) {
    this.id = id;
    this.createdAt = createdAt;
    this.lotExpireDate = lotExpireDate;
    this.lotFinishDate = lotFinishDate;
    this.product = product;
    this.totalPrice = totalPrice;
    this.status = status;
  }
}
