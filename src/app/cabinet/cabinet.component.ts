import {Component, OnDestroy, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit, OnDestroy {

  user: UserResponse;
  subscriptions: Array<Subscription> = [];
  cabinetInited: boolean = false;


  constructor(private authService: AuthService,
              private baseService: BaseService,
              private userService: UserService,
              private productService: ProductService,
              private auctionService: AuctionsService,
              private router: Router) {
  }

  get ImageConstants(): typeof ImageConstants {
    return ImageConstants;
  }

  ngOnInit(): void {
    this.initCabinet();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  initCabinet(): void {
    this.userService.getUser()
      .pipe(
        catchError(err => {
          this.baseService.logout();
          throw err;
        })
      ).subscribe(userResponse => {
      this.userService.setUser(userResponse);
      this.productService.setProducts(userResponse.products);
      this.auctionService.setAuctions(userResponse.auctions);
      this.initSubscriptions();
      this.cabinetInited = true;
    });
  }

  initSubscriptions(): void {
    this.subscriptions.push(this.userService.userProfile.subscribe(user => this.user = user));
  }

  onExitClick(): void {
    this.baseService.logout();
  }

  onProfileClick(): void {
    this.router.navigate(['/cabinet/profile', this.userService.userProfile.getValue().id]);
  }

}
