export class TicketsPurchaseRequest {
  auctionId: number;
  ticketNumbers: Array<number>;

  constructor( auctionId: number, ticketNumbers: Array<number>) {
    this.auctionId = auctionId;
    this.ticketNumbers = ticketNumbers;
  }
}
