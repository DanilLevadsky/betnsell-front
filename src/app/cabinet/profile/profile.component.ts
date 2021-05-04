import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription> = [];
  user: UserResponse;
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


  constructor(private userService: UserService,
              private productService: ProductService,
              private fb: FormBuilder,
              private notifications: NzNotificationService,
              private route: ActivatedRoute,
              private router: Router,
              private auctionService: AuctionsService) {
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

  successProductCreation = (product: Product) => {
    this.closeProductModal();
    this.productService.addProduct(product);
    this.notifications.success('Успех!', 'Вы успешно создали новый товар');
  };

  successAuctionCreation = (auction: Auction) => {
    this.closeAuctionModal();
    this.auctionService.setAuction(auction);
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
    this.route.params.subscribe(params => {
      this.user = this.userService.userProfile.getValue();
      this.initForms();
      this.initValuesChange();
      // if (!params.id) {
      //   this.router.navigate(['/cabinet/profile', this.user.id]);
      // }
    });
    // this.initSubscriptions();
  }

  // initSubscriptions(): void {
  //   const userPromise = new Promise(((resolve, reject) => {
  //     this.subscriptions.push(this.userService.userProfile.subscribe(user => {
  //       this.user = user;
  //       this.initFormValues(user);
  //       resolve(user);
  //     }));
  //   }));
  //   userPromise.then(user => {
  //     // @ts-ignore
  //     this.subscriptions.push(this.productService.getUserProducts(user.id).subscribe(products => this.userProducts = products));
  //     this.profileInited = true;
  //   });
  // }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onEmailChangeClick(): void {
    const request: UpdatedUserEmail = new UpdatedUserEmail(this.changeEmailForm.controls.email.value);
    this.userService.updateUserEmail(request).subscribe(() => {
      this.userService.changeEmail(request);
      this.notifications.success('Успех!', 'Вы удачно сменили почту');
    });
  }

  onUsernameChangeClick(): void {
    const request: UpdatedUserUsername = new UpdatedUserUsername(this.changeUsernameForm.controls.username.value);
    this.userService.updateUserUsername(request).subscribe(() => {
      this.userService.changeNickname(request);
      this.notifications.success('Успех!', 'Вы удачно сменили юзернейм');
    });
  }

  onMobileChangeClick(): void {
    const request: UpdatedUserMobile = new UpdatedUserMobile(this.changeMobileForm.controls.mobile.value);
    this.userService.updateUserMobile(request).subscribe(() => {
      this.userService.changeMobile(request);
      this.notifications.success('Успех!', 'Вы удачно сменили телефон');
    });
  }

  onNameChangeClick(): void {
    const request: UpdatedUserName = new UpdatedUserName(this.changeNameForm.controls.name.value);
    this.userService.updateUserName(request).subscribe(() => {
      this.userService.changeName(request);
      this.notifications.success('Успех!', 'Вы удачно сменили имя');
    });
  }

  onTypeClick(section: ProfileListType): void {
    this.chosenType = section;
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.productService.removeProductFromList(id);
      this.notifications.success('Успех!', 'Вы удачно удалили товар');
    });
  }

}
