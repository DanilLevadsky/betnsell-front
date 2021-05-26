export class Ticket {
  id: number;
  userId: number;
  ticketNumber: number;

  constructor(id: number, userId: number, ticketNumber: number) {
    this.id = id;
    this.userId = userId;
    this.ticketNumber = ticketNumber;
  }
}
