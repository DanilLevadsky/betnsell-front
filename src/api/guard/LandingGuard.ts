import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class LandingGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.auth.isLoggedOut()) {
      return true;
    } else {
      this.router.navigate(['/cabinet']);
      return false;
    }

  }
}
