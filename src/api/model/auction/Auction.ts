import {Product} from '../product/Product';
import {Ticket} from './Ticket';
import {AuctionStatus} from './AuctionStatus';

export class Auction {
  id: number;
  product: Product;
  createdAt: string;
  lotFinishDate: string;
  lotExpireDate: string;
  pricePerTicket: number;
  totalTickets: number;
  winnerId: number;
  totalPrice: number;
  tickets: Array<Ticket>;
  status: AuctionStatus;
  users: Array<number>

  constructor(id: number, createdAt: string, lotFinishDate: string, lotExpireDate: string, pricePerTicket: number,
              totalTickets: number, winnerId: number, product: Product, totalPrice: number, tickets: Array<Ticket>,
              status: AuctionStatus, users: Array<number>) {
    this.id = id;
    this.createdAt = createdAt;
    this.lotExpireDate = lotExpireDate;
    this.lotFinishDate = lotFinishDate;
    this.pricePerTicket = pricePerTicket;
    this.totalTickets = totalTickets;
    this.winnerId = winnerId;
    this.product = product;
    this.totalPrice = totalPrice;
    this.tickets = tickets;
    this.status = status;
    this.users = users;
  }
}
