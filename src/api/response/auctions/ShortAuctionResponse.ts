import {Product} from '../../model/product/Product';
import {Ticket} from '../../model/auction/Ticket';

export class ShortAuctionResponse {
  id: number;
  product: Product;
  createdAt: string;
  lotFinishDate: string;
  lotExpireDate: string;
  pricePerTicket: number;
  totalTickets: number;
  winnerId: number;
  totalPrice: number;

  constructor(id: number, createdAt: string, lotFinishDate: string, lotExpireDate: string, pricePerTicket: number,
              totalTickets: number, winnerId: number, product: Product, totalPrice: number) {
    this.id = id;
    this.createdAt = createdAt;
    this.lotExpireDate = lotExpireDate;
    this.lotFinishDate = lotFinishDate;
    this.pricePerTicket = pricePerTicket;
    this.totalTickets = totalTickets;
    this.winnerId = winnerId;
    this.product = product;
    this.totalPrice = totalPrice;
  }
}
