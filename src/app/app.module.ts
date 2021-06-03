import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CabinetComponent} from './cabinet/cabinet.component';
import {LandingComponent} from './landing/landing.component';
import {LandingGuard} from '../api/guard/LandingGuard';
import {ConfigService} from '../api/service/config.service';
import {RouterModule} from '@angular/router';
import {AuthService} from '../api/service/auth.service';
import {MainComponent} from './cabinet/main/main.component';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpsInterceptor} from '../api/interceptor/HttpsInterceptor';
import AppRoutes from './cabinet/router';
import {PrivateGuard} from '../api/guard/PrivateGuard';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzFormModule} from 'ng-zorro-antd/form';
import {RegisterModalComponent} from './landing/register-modal/register-modal.component';
import {LoginModalComponent} from './landing/login-modal/login-modal.component';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {GlobalErrorInterceptor} from '../api/interceptor/GlobalErrorInterceptor';
import {BaseService} from '../api/service/base.service';
import {UserService} from '../api/service/user.service';
import {ProductService} from '../api/service/product.service';
import {ProfileComponent} from './cabinet/profile/profile.component';
import {AuctionsService} from '../api/service/auctions.service';
import { ProductModalComponent } from './cabinet/profile/product-modal/product-modal.component';
import { AuctionModalComponent } from './cabinet/profile/auction-modal/auction-modal.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProductShortComponent } from './cabinet/profile/product-short/product-short.component';
import { AuctionShortComponent } from './cabinet/auction-short/auction-short.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { ProductEditModalComponent } from './cabinet/profile/product-short/product-edit-modal/product-edit-modal.component';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import { AuctionComponent } from './cabinet/auction/auction.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {Overlay, OverlayModule} from '@angular/cdk/overlay';
import {TestUserService} from '../api/service/test-services/test-user.service';
import { BalanceModalComponent } from './cabinet/balance/balance-modal/balance-modal.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import {TicketsService} from '../api/service/ticketsService';


registerLocaleData(en);

export function initApp(configService: ConfigService): any {
  return () => configService.load().toPromise();
}

@NgModule({
  declarations: [
    AppComponent,
    CabinetComponent,
    LandingComponent,
    MainComponent,
    RegisterModalComponent,
    LoginModalComponent,
    ProfileComponent,
    ProductModalComponent,
    AuctionModalComponent,
    ProductShortComponent,
    AuctionShortComponent,
    ProductEditModalComponent,
    AuctionComponent,
    BalanceModalComponent
  ],
  imports: [
    OverlayModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    NzNotificationModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzSelectModule,
    NzSkeletonModule,
    NzSpinModule,
    NzPaginationModule,
    NgxSpinnerModule,
    NzPopoverModule
  ],
  providers: [
    LandingGuard,
    PrivateGuard,
    ConfigService,
    AuthService,
    BaseService,
    UserService,
    ProductService,
    AuctionsService,
    HttpClientModule,
    TestUserService,
    TicketsService,
    {provide: NZ_I18N, useValue: en_US},
    {
      provide: ErrorHandler,
      useClass: GlobalErrorInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [ConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
