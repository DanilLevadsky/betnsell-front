import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Auction} from '../model/auction/Auction';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuctionCreateRequest} from '../request/auction/AuctionCreateRequest';
import {PaginationResponse} from '../response/pagination/PaginationResponse';
import {BaseService} from './base.service';
import {TicketsPurchaseRequest} from '../request/auction/TicketsPurchaseRequest';
import {TicketsPurchaseResponse} from '../response/auctions/TicketsPurchaseResponse';

@Injectable()

export class AuctionsService {

  apiUrl: string;

  // allAuctions: BehaviorSubject<Array<Auction>> = new BehaviorSubject<Array<Auction>>([]);

  constructor(private config: ConfigService,
              private httpClient: HttpClient,
              private baseService: BaseService) {
    this.apiUrl = 'http://127.0.0.1:3000/auctions';
  }

  // setAuctions(auctions: Array<Auction>): void {
  //   this.allAuctions.next(auctions);
  // }
  //
  // setAuction(auction: Auction): void {
  //   const currentArray: Array<Auction> = this.allAuctions.getValue();
  //   currentArray.push(auction);
  //   this.allAuctions.next(currentArray);
  // }

  createAuction(request: AuctionCreateRequest): Observable<Auction> {
    return this.httpClient.put<Auction>(`${this.apiUrl}/create`, request);
  }

  getAuctions(page: number = 1, perPage: number = 4): Observable<PaginationResponse<Array<Auction>>> {
    return this.httpClient.get<PaginationResponse<Array<Auction>>>(`${this.apiUrl}/`,
      {params: this.baseService.getPaginationParams(page, perPage)});
  }

  getAuction(id: number): Observable<Auction> {
    return this.httpClient.get<Auction>(`${this.apiUrl}/${id}`);
  }

  purchaseTickets(request: TicketsPurchaseRequest): Observable<TicketsPurchaseResponse> {
    return this.httpClient.post<TicketsPurchaseResponse>(`http://127.0.0.1:3000/tickets/`, request);
  }


}
