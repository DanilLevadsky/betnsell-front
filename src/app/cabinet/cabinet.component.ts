import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../api/service/auth.service';
import {BaseService} from '../../api/service/base.service';
import {UserService} from '../../api/service/user.service';
import {ProductService} from '../../api/service/product.service';
import {forkJoin, Subscription} from 'rxjs';
import {UserAuthResponse} from '../../api/response/auth/UserAuthResponse';
import {catchError} from 'rxjs/operators';
import {UserResponse} from '../../api/response/users/UserResponse';
import {Product} from '../../api/model/product/Product';
import {ImageConstants} from '../../api/constants/ImageConstants';
import {Router} from '@angular/router';
import {AuctionsService} from '../../api/service/auctions.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit, OnDestroy, AfterViewInit {

  user: UserResponse;
  subscriptions: Array<Subscription> = [];
  cabinetInited: boolean = false;
  isBalanceModalOpened: boolean = false;


  constructor(private authService: AuthService,
              private baseService: BaseService,
              private userService: UserService,
              private productService: ProductService,
              private auctionService: AuctionsService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private notifications: NzNotificationService) {
  }

  get ImageConstants(): typeof ImageConstants {
    return ImageConstants;
  }

  ngOnInit(): void {
    this.initCabinet();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  initCabinet(): void {
    this.spinner.show();
    this.userService.getUser()
      .pipe(
        catchError(err => {
          this.baseService.logout();
          throw err;
        })
      ).subscribe(userResponse => {
      this.userService.setUser(userResponse);
      this.initSubscriptions();
      this.cabinetInited = true;
      this.spinner.hide();
    });
  }

   initSubscriptions(): void {
    this.subscriptions.push(this.userService.userProfile.subscribe(user => this.user = user));
  }

  onExitClick(): void {
    this.baseService.logout();
  }

  onProfileClick(): void {
    this.router.navigate(['/app/cabinet']);
  }

  onAddBalanceClick(): void {
    this.isBalanceModalOpened = true;
  }

  onAddBalanceCancel = (): void => {
    this.isBalanceModalOpened = false;
  };

  onAddBalanceSuccess = (): void => {
    this.onAddBalanceCancel();
    this.notifications.success('Успех!', 'Вы удачно пополнили баланс');
  }

}
