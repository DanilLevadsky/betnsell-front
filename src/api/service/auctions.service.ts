import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {Auction} from '../model/auction/Auction';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuctionCreateRequest} from '../request/auction/AuctionCreateRequest';

@Injectable()

export class AuctionsService {

  apiUrl: string;
  allAuctions: BehaviorSubject<Array<Auction>> = new BehaviorSubject<Array<Auction>>([]);

  constructor(private config: ConfigService,
              private httpClient: HttpClient) {
    this.apiUrl = 'http://127.0.0.1:3000/auctions';
  }

  setAuctions(auctions: Array<Auction>): void {
    this.allAuctions.next(auctions);
  }

  setAuction(auction: Auction): void {
    const currentArray: Array<Auction> = this.allAuctions.getValue();
    currentArray.push(auction);
    this.allAuctions.next(currentArray);
  }

  createAuction(request: AuctionCreateRequest): Observable<Auction> {
    return this.httpClient.put<Auction>(`${this.apiUrl}/create`, request);
  }


}
