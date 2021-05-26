import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuctionsService} from '../../../api/service/auctions.service';
import {Auction} from '../../../api/model/auction/Auction';
import {ImageConstants} from '../../../api/constants/ImageConstants';
import ColorConstants from '../../../api/constants/ColorConstants';
import {UserService} from '../../../api/service/user.service';
import {UserResponse} from '../../../api/response/users/UserResponse';
import {TicketsPurchaseRequest} from '../../../api/request/auction/TicketsPurchaseRequest';
import {AuctionStatus} from '../../../api/model/auction/AuctionStatus';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {TimeLeft} from '../../../api/model/time/TimeLeft';
import TimeUtil from '../../../api/utils/TimeUtil';
import {NgxSpinner} from 'ngx-spinner/lib/ngx-spinner.enum';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit, OnDestroy {

  params: any;
  auction: Auction;
  ticketSize: number;
  currentUser: UserResponse;
  usersColors: Map<number, string> = new Map<number, string>();
  chosenTickets: Array<number> = [];
  finishDate: TimeLeft;
  dateInterval: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auctionService: AuctionsService,
              private userService: UserService,
              private notificationService: NzNotificationService,
              private spinner: NgxSpinnerService) {
  }

  get imageConstants(): typeof ImageConstants {
    return ImageConstants;
  }

  get colorConstants(): typeof ColorConstants {
    return ColorConstants;
  }

  ngOnInit(): void {
    this.currentUser = this.userService.userProfile.getValue();
    this.route.params.subscribe(params => {
      if (params) {
        this.params = params;
        this.initAuction();
      } else {
        this.router.navigate(['/app/']);
      }
    });
  }

  initAuction(): void {
    this.auctionService.getAuction(this.params.id).subscribe(auction => {
      this.auction = auction;
      this.initUsersColors();
      clearInterval(this.dateInterval);
      this.updateFinishDate();
      this.dateInterval = setInterval(this.updateFinishDate, 1000);
    });
  }

  initUsersColors(): void {
    let usersArray: Array<number> = [];
    this.auction.tickets.forEach(ticket => {
      if (!usersArray.includes(ticket.userId)) {
        usersArray.push(ticket.userId);
      }
    });
    usersArray.forEach((user, index) => {
      this.usersColors.set(user, ColorConstants[index]);
    });
  }

  onTicketClick(ticketId: number): void {
    if (this.chosenTickets.includes(ticketId)) {
      this.chosenTickets = this.chosenTickets.filter(item => item !== ticketId);
    } else {
      this.chosenTickets.push(ticketId);
    }
  }

  onBuyClick(): void {
    this.auctionService.purchaseTickets(new TicketsPurchaseRequest(this.auction.id, this.chosenTickets)).subscribe(response => {
      this.initAuction();
      this.chosenTickets = [];
      this.notificationService.success('Успех!', 'Вы удачно купили билеты');
    })
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


}
