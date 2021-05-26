export class AuctionCreateRequest {
  pricePerTicket: number;
  totalTickets: number;
  productId: number;

  constructor(pricePerTicket: number, totalTickets: number, productId: number) {
    this.totalTickets = totalTickets;
    this.pricePerTicket = pricePerTicket;
    this.productId = productId;
  }
}
