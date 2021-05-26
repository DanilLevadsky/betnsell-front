import {Routes} from '@angular/router';
import {LandingComponent} from '../landing/landing.component';
import {LandingGuard} from '../../api/guard/LandingGuard';
import {CabinetComponent} from './cabinet.component';
import {PrivateGuard} from '../../api/guard/PrivateGuard';
import {MainComponent} from './main/main.component';
import {ProfileComponent} from './profile/profile.component';
import {AuctionComponent} from './auction/auction.component';

const AppRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [LandingGuard]
  },
  {
    path: 'app',
    component: CabinetComponent,
    canActivate: [PrivateGuard],
    children: [
      {
        path: '',
        component: MainComponent,
      },
      {
        path: 'cabinet',
        component: ProfileComponent,
      },
      {
        path: 'auction/:id',
        component: AuctionComponent,
      },
    ]
  },
];

export default AppRoutes;
