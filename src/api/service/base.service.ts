import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class BaseService {
  constructor(private authService: AuthService,
              private router: Router){}

  logout(): void {
    this.authService.clearSession();
    this.router.navigate(['']);
  }

  getPaginationParams(page: number, perPage: number): HttpParams {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('perPage', perPage.toString());
    return params;
  }
}
