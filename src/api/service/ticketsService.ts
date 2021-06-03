import {Injectable} from '@angular/core';
import {TicketsPurchaseRequest} from '../request/auction/TicketsPurchaseRequest';
import {Observable} from 'rxjs';
import {TicketsPurchaseResponse} from '../response/auctions/TicketsPurchaseResponse';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';

@Injectable()
export class TicketsService{

  apiUrl: string;

  constructor(private httpClient: HttpClient,
              private config: ConfigService){
    this.apiUrl = `http://52.58.171.243:3000/tickets`;
  }

  purchaseTickets(request: TicketsPurchaseRequest): Observable<TicketsPurchaseResponse> {
    return this.httpClient.post<TicketsPurchaseResponse>(`${this.apiUrl}/`, request);
  }


}
