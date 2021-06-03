import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {UserResponse} from '../../../api/response/users/UserResponse';
import {Product} from '../../../api/model/product/Product';
import {UserService} from '../../../api/service/user.service';
import {ProductService} from '../../../api/service/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ActivatedRoute, Router} from '@angular/router';
import {UpdatedUserEmail} from '../../../api/request/user/UpdatedUserEmail';
import {UpdatedUserUsername} from '../../../api/request/user/UpdatedUserUsername';
import {UpdatedUserMobile} from '../../../api/request/user/UpdatedUserMobile';
import {UpdatedUserName} from '../../../api/request/user/UpdatedUserName';
import {ProfileListType} from '../../../api/model/profile/ProfileListType';
import {Auction} from '../../../api/model/auction/Auction';
import {ImageConstants} from '../../../api/constants/ImageConstants';
import {AuctionsService} from '../../../api/service/auctions.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription> = [];
  user: UserResponse;
  userProducts: Array<Product | null> = new Array(2).fill(null);
  userAuctions: Array<Auction | null> = new Array(2).fill(null);
  profileInited: boolean = false;
  changeEmailForm: FormGroup;
  changeUsernameForm: FormGroup;
  changeMobileForm: FormGroup;
  changeNameForm: FormGroup;
  disableEmailChange: boolean = true;
  disableUsernameChange: boolean = true;
  disableMobileChange: boolean = true;
  disableNameChange: boolean = true;
  chosenType: ProfileListType = ProfileListType.PRODUCTS;
  isProductModalOpened: boolean = false;
  isAuctionModalOpened: boolean = false;
  productForAuctionModal: Product;
  currentProductsPage: number = 1;
  currentAuctionsPage: number = 1;
  totalProductsPages: number;
  totalAuctionsPages: number;


  constructor(public userService: UserService,
              private productService: ProductService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private auctionService: AuctionsService,
              private spinner: NgxSpinnerService,
              private notifications: NzNotificationService) {
  }

  get profileListType(): typeof ProfileListType {
    return ProfileListType;

  }

  get imageConstants(): typeof ImageConstants {
    return ImageConstants;
  }

  openProductModal = () => {
    this.isProductModalOpened = true;
  };

  openAuctionModal = () => {
    this.isAuctionModalOpened = true;
  };

  closeProductModal = () => {
    this.isProductModalOpened = false;
  };

  closeAuctionModal = () => {
    this.isAuctionModalOpened = false;
  };

  successProductCreation = () => {
    this.initProducts();
    this.closeProductModal();
    this.notifications.success('Успех!', 'Вы успешно создали новый товар');
  };

  successAuctionCreation = (auction: Auction) => {
    this.initAuctions();
    this.closeAuctionModal();
    this.notifications.success('Успех!', 'Вы успешно создали новый аукцион');
  };

  initForms(): void {
    this.changeEmailForm = this.fb.group({
      email: [this.user.userInfo.email, [Validators.email]]
    });
    this.changeUsernameForm = this.fb.group({
      username: [this.user.username, [Validators.pattern(/^[\S\s]{8,16}$/)]]
    });
    this.changeMobileForm = this.fb.group({
      mobile: [this.user.userInfo.mobile, [Validators.pattern(/^[\S\s]{8,16}$/)]]
    });
    this.changeNameForm = this.fb.group({
      name: [this.user.userInfo.name, [Validators.pattern(/^[\S\s]{8,16}$/)]]
    });
  }

  initValuesChange(): void {
    const emailField = this.changeEmailForm.controls.email;
    const usernameField = this.changeUsernameForm.controls.username;
    const mobileField = this.changeMobileForm.controls.mobile;
    const nameField = this.changeNameForm.controls.name;
    this.subscriptions.push(emailField.valueChanges.subscribe(email => {
      this.disableEmailChange = emailField.invalid || email === this.user.userInfo.email;
    }));
    this.subscriptions.push(usernameField.valueChanges.subscribe(username => {
      this.disableUsernameChange = usernameField.invalid || username === this.user.username;
    }));
    this.subscriptions.push(mobileField.valueChanges.subscribe(mobile => {
      this.disableMobileChange = mobileField.invalid || mobile === this.user.userInfo.mobile;
    }));
    this.subscriptions.push(nameField.valueChanges.subscribe(name => {
      this.disableNameChange = nameField.invalid || name === this.user.userInfo.name;
    }));

  }

  ngOnInit(): void {
    this.user = this.userService.userProfile.getValue();
    if (this.user){
      this.initForms();
      this.initValuesChange();
      this.initProducts();
      this.initAuctions();
    }
  }

  initProducts(): void {
    this.userService.getUserProducts(this.user.id, this.currentProductsPage).subscribe(products => {
      this.totalProductsPages = products.totalPages;
      this.userProducts = products.content;
    });
  }

  initAuctions(): void {
    this.userService.getUserAuctions(this.user.id, this.currentAuctionsPage).subscribe(auctions => {
      this.totalAuctionsPages = auctions.totalPages;
      this.userAuctions = auctions.content;
    })
  }

  updateUserProducts(page: number): void {
    this.currentProductsPage = page;
    this.initProducts();
  }

  updateUserAuctions(page: number): void {
    this.currentAuctionsPage = page;
    this.initAuctions();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onEmailChangeClick(): void {
    const request: UpdatedUserEmail = new UpdatedUserEmail(this.changeEmailForm.controls.email.value);
    this.userService.updateUserEmail(request).subscribe(() => {
      this.userService.changeEmail(request);
      this.disableEmailChange = true;
      this.notifications.success('Успех!', 'Вы удачно сменили почту');
    });
  }

  onUsernameChangeClick(): void {
    const request: UpdatedUserUsername = new UpdatedUserUsername(this.changeUsernameForm.controls.username.value);
    this.userService.updateUserUsername(request).subscribe(() => {
      this.userService.changeNickname(request);
      this.disableUsernameChange = true;
      this.notifications.success('Успех!', 'Вы удачно сменили юзернейм');
    });
  }

  onMobileChangeClick(): void {
    const request: UpdatedUserMobile = new UpdatedUserMobile(this.changeMobileForm.controls.mobile.value);
    this.userService.updateUserMobile(request).subscribe(() => {
      this.userService.changeMobile(request);
      this.disableMobileChange = true;
      this.notifications.success('Успех!', 'Вы удачно сменили телефон');
    });
  }

  onNameChangeClick(): void {
    const request: UpdatedUserName = new UpdatedUserName(this.changeNameForm.controls.name.value);
    this.userService.updateUserName(request).subscribe(() => {
      this.userService.changeName(request);
      this.disableNameChange = true;
      this.notifications.success('Успех!', 'Вы удачно сменили имя');
    });
  }

  onTypeClick(section: ProfileListType): void {
    this.chosenType = section;
  }

  onCreateClick(): void {
    if (this.chosenType === ProfileListType.AUCTIONS) {
      this.productForAuctionModal = null;
      this.openAuctionModal();
    } else if (this.chosenType === ProfileListType.PRODUCTS) {
      this.openProductModal();
    }
  }

  deleteProduct = (id: number): void => {
    this.userProducts = this.userProducts.filter(product => product.id !== id );
  }

  updateProduct = (updatedProduct: Product): void => {
    this.userProducts = this.userProducts.map(product => product.id === updatedProduct.id ? updatedProduct : product);
  }

  openAuctionModalWithProduct = (product: Product): void => {
    this.productForAuctionModal = product;
    this.openAuctionModal()
  }

  onBackClick(): void {
    this.router.navigate(['/app/']);
  }
}
