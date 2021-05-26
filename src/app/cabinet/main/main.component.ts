import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProductService} from '../../../api/service/product.service';
import {Product} from '../../../api/model/product/Product';
import {ImageConstants} from '../../../api/constants/ImageConstants';
import {Router} from '@angular/router';
import {Auction} from '../../../api/model/auction/Auction';
import {AuctionsService} from '../../../api/service/auctions.service';
import {UserResponse} from '../../../api/response/users/UserResponse';
import {UserService} from '../../../api/service/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription> = [];
  auctions: Array<Auction | null> = new Array(3).fill(null);
  currentUser: UserResponse;
  currentAuctionsPage: number = 1;
  totalAuctionsPages: number;

  constructor(private auctionService: AuctionsService,
              private userService: UserService) {
  }

  get ImageConstants(): typeof ImageConstants {
    return ImageConstants;
  }

  ngOnInit(): void {
    this.currentUser = this.userService.userProfile.getValue();
    this.initAuctions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  initAuctions(): void {
    this.auctionService.getAuctions(this.currentAuctionsPage).subscribe(auctions => {
      this.totalAuctionsPages = auctions.totalPages;
      this.auctions = auctions.content;
    })
  }

  onPageChanged(page: number): void {
    this.currentAuctionsPage = page;
    this.initAuctions();
  }



}
