// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {AuctionModalComponent} from './auction-modal.component';
// import {Router} from '@angular/router';
// import {HttpClientTestingModule} from '@angular/common/http/testing';
// import {UserService} from '../../../../api/service/user.service';
// import {RouterTestingModule} from '@angular/router/testing';
// import {OverlayModule} from '@angular/cdk/overlay';
// import {FormBuilder} from '@angular/forms';
// import {AuctionsService} from '../../../../api/service/auctions.service';
// import {ConfigService} from '../../../../api/service/config.service';
// import {BaseService} from '../../../../api/service/base.service';
// import {AuthService} from '../../../../api/service/auth.service';
// import {ProductService} from '../../../../api/service/product.service';
// import {BehaviorSubject} from 'rxjs';
// import {UserResponse} from '../../../../api/response/users/UserResponse';
//
//
// describe('AuctionModal', () => {
//   let component: AuctionModalComponent;
//   let fixture: ComponentFixture<AuctionModalComponent>;
//   let router: Router;
//
//
//   /* COMPONENTS COMPILING */
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [AuctionModalComponent],
//       imports: [HttpClientTestingModule, RouterTestingModule, OverlayModule],
//       providers: [UserService,
//         FormBuilder,
//         FormBuilder,
//         AuctionsService,
//         ConfigService,
//         BaseService,
//         ProductService,
//         AuthService
//       ]
//     }).compileComponents();
//   }));
//
//
//   /* BASE CONFIGURATIONS */
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AuctionModalComponent);
//     component = fixture.componentInstance;
//     component.userService.userProfile = new BehaviorSubject<UserResponse>({id: 1, username: 'testUserName', balance: 100, userInfo:
//         {email: 'test1@re.re', name: 'testName', mobile: '098'}, profilePic: ''});
//     fixture.detectChanges();
//   });
//
//
//   /* TEST FORM INVALID */
//
//   it('should create', () => {
//     component.form.setValue({pricePerTicket: 999999, totalTickets: 10000000, productId: 1919199});
//     expect(component.form.valid).toEqual(false);
//   });
//
//
//
//   /* TEST FORM VALID */
//
//   it('should create', () => {
//     component.form.setValue({pricePerTicket: 10, totalTickets: 10, productId: 10});
//     expect(component.form.valid).toEqual(true);
//   });
//
// });
