import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Auction} from '../../../api/model/auction/Auction';
import {ImageConstants} from '../../../api/constants/ImageConstants';
import {TimeLeft} from '../../../api/model/time/TimeLeft';
import TimeUtil from '../../../api/utils/TimeUtil';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auction-short',
  templateUrl: './auction-short.component.html',
  styleUrls: ['./auction-short.component.css']
})
export class AuctionShortComponent implements OnInit, OnChanges, OnDestroy {

  @Input() auction: Auction;
  finishDate: TimeLeft;
  dateInterval: number;

  constructor(private router: Router) {
  }

  get imageConstants(): typeof ImageConstants {
    return ImageConstants;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.auction && changes.auction.currentValue) {
      clearInterval(this.dateInterval);
      this.updateFinishDate();
      this.dateInterval = setInterval(this.updateFinishDate, 1000);
    }
  }

  updateFinishDate = (): void => {
    if (TimeUtil.dateIsInFuture(this.auction.lotExpireDate)) {
      this.finishDate = TimeUtil.timeUntilDate(this.auction.lotExpireDate);
    } else {
      clearInterval(this.dateInterval);
    }
  };

  ngOnDestroy(): void {
    clearInterval(this.dateInterval);
  }

  onAuctionClick(): void {
    this.router.navigate(['/app/auction', this.auction.id]);
  }

}
