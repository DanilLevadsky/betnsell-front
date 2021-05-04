import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable()
export class BaseService {
  constructor(private authService: AuthService,
              private router: Router){}

  logout(): void {
    this.authService.clearSession();
    this.router.navigate(['']);
  }
}
