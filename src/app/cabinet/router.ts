import {Routes} from '@angular/router';
import {LandingComponent} from '../landing/landing.component';
import {LandingGuard} from '../../api/guard/LandingGuard';
import {CabinetComponent} from './cabinet.component';
import {PrivateGuard} from '../../api/guard/PrivateGuard';
import {MainComponent} from './main/main.component';
import {ProfileComponent} from './profile/profile.component';

const AppRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [LandingGuard]
  },
  {
    path: 'cabinet',
    component: CabinetComponent,
    canActivate: [PrivateGuard],
    children: [
      {
        path: '',
        component: MainComponent,
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
      },
    ]
  },
];

export default AppRoutes;
