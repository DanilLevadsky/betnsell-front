import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {UserService} from '../../../api/service/user.service';
import {ProductService} from '../../../api/service/product.service';
import {FormBuilder} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {AuctionsService} from '../../../api/service/auctions.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {ConfigService} from '../../../api/service/config.service';
import {BaseService} from '../../../api/service/base.service';
import {AuthService} from '../../../api/service/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Overlay, OverlayModule} from '@angular/cdk/overlay';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {UserResponse} from '../../../api/response/users/UserResponse';
import {TestUserService} from '../../../api/service/test-services/test-user.service';
import {ProfileListType} from '../../../api/model/profile/ProfileListType';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let router: Router;


  /* COMPONENTS COMPILING */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, OverlayModule],
      providers: [UserService,
        ProductService,
        FormBuilder,
        AuctionsService,
        NgxSpinnerService,
        ConfigService,
        BaseService,
        AuthService
      ]
    }).compileComponents();
  }));




  /* BASE CONFIGURATIONS */

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    component.userService.userProfile = new BehaviorSubject<UserResponse>({id: 1, username: 'testUserName', balance: 100, userInfo:
        {email: 'test1@re.re', name: 'testName', mobile: '098'}, profilePic: ''});
    // component.user = {id: 1, username: 'testUserName', balance: 100, userInfo: {email: 'test1@re.re', name: 'testName', mobile: '098'}, profilePic: ''};
    router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
  });



  /* COMPONENT INITIALIZATION */

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate', () => {
    expect(component).toBeDefined();
  });




  /* TEST BACK-BUTTON CLICK */

  it('should trigger the navigation to `back`', async(() => {
    const link = fixture.debugElement.nativeElement.querySelector('.go-back');
    link.click();
    expect(router.navigateByUrl).toHaveBeenCalled();
  }));



  /* TEST PRODUCTS BUTTON CHOOSE */

  it('should trigger the products button click', async(() => {
    const button = fixture.debugElement.nativeElement.querySelector('.products');
    button.click();
    expect(component.chosenType).toEqual(ProfileListType.PRODUCTS);
  }));



  /* TEST AUCTIONS BUTTON CHOOSE */

  it('should trigger the products button click', async(() => {
    const button = fixture.debugElement.nativeElement.querySelector('.auctions');
    button.click();
    expect(component.chosenType).toEqual(ProfileListType.AUCTIONS);
  }));



  /* TEST AUCTIONS BUTTON CHOOSE */

  it('should trigger the products button click', async(() => {
    const button = fixture.debugElement.nativeElement.querySelector('.auctions');
    button.click();
    expect(component.chosenType).toEqual(ProfileListType.AUCTIONS);
  }));



  /* TEST CREATE AUCTION MODAL BUTTON */

  it('should trigger the auction modal button click', async(() => {
    component.chosenType = ProfileListType.AUCTIONS;
    const button = fixture.debugElement.nativeElement.querySelector('.create');
    button.click();
    expect(component.isAuctionModalOpened).toEqual(true);
  }));



  /* TEST CREATE PRODUCT MODAL BUTTON */

  it('should trigger the product modal button click', async(() => {
    component.chosenType = ProfileListType.PRODUCTS;
    const button = fixture.debugElement.nativeElement.querySelector('.create');
    button.click();
    expect(component.isProductModalOpened).toEqual(true);
  }));


});
