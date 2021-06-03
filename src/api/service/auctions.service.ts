import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Auction} from '../model/auction/Auction';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuctionCreateRequest} from '../request/auction/AuctionCreateRequest';
import {PaginationResponse} from '../response/pagination/PaginationResponse';
import {BaseService} from './base.service';

@Injectable()

export class AuctionsService {

  apiUrl: string;

  constructor(private config: ConfigService,
              private httpClient: HttpClient,
              private baseService: BaseService) {
    this.apiUrl = `${this.config.getApiEndpoint()}/auctions`;
  }

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
}
