import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '../../../../api/service/user.service';
import {RouterTestingModule} from '@angular/router/testing';
import {OverlayModule} from '@angular/cdk/overlay';
import {FormBuilder} from '@angular/forms';
import {AuctionsService} from '../../../../api/service/auctions.service';
import {ConfigService} from '../../../../api/service/config.service';
import {BaseService} from '../../../../api/service/base.service';
import {AuthService} from '../../../../api/service/auth.service';
import {ProductService} from '../../../../api/service/product.service';
import {BehaviorSubject} from 'rxjs';
import {UserResponse} from '../../../../api/response/users/UserResponse';
import {ProductModalComponent} from './product-modal.component';


describe('ProductModal', () => {
  let component: ProductModalComponent;
  let fixture: ComponentFixture<ProductModalComponent>;
  let router: Router;


  /* COMPONENTS COMPILING */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductModalComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, OverlayModule],
      providers: [UserService,
        FormBuilder,
        FormBuilder,
        AuctionsService,
        ConfigService,
        BaseService,
        ProductService,
        AuthService
      ]
    }).compileComponents();
  }));


  /* BASE CONFIGURATIONS */

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductModalComponent);
    component = fixture.componentInstance;
    component.userService.userProfile = new BehaviorSubject<UserResponse>({id: 1, username: 'testUserName', balance: 100, userInfo:
        {email: 'test1@re.re', name: 'testName', mobile: '098'}, profilePic: ''});
    fixture.detectChanges();
  });


  /* TEST FORM INVALID */

  it('should create', () => {
    component.form.setValue({title: 'zxc', userId: 123, description: 'asd', photo: 'ads'});
    expect(component.form.valid).toEqual(false);
  });



  /* TEST FORM VALID */

  it('should create', () => {
    component.form.setValue({title: 'normalssssss', userId: 123, description: 'aasdasdssssd', photo: 'ads'});
    expect(component.form.valid).toEqual(true);
  });

});
