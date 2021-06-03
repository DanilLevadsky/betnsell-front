import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {UserAuthResponse} from '../response/auth/UserAuthResponse';
import {catchError, timeout} from 'rxjs/operators';
import {RegRequest} from '../request/RegRequest';
import {AuthRequest} from '../request/AuthRequest';
import {AuthRequestType} from '../model/auth/AuthRequestType';

@Injectable()
export class AuthService {
  apiUrl: string;

  constructor(private httpClient: HttpClient,
              private config: ConfigService) {
    this.apiUrl = `http://52.58.171.243:3000`;
  }

  public isLoggedIn(): boolean {
    return this.getUser() && !this.tokenOutdated();
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  public getUser(): UserAuthResponse {
    return localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')) : false;
  }

  login(request: AuthRequest, errorCallback, successCallback): void {
    const requestType: string = request.type === AuthRequestType.EMAIL_AUTH ? 'email' : 'username';
    this.httpClient
      .post<UserAuthResponse>(`${this.apiUrl}/auth/login/${requestType}`, request.request).pipe(
      catchError(err => {
        errorCallback(err);
        throw err;
      })
    ).subscribe(next => {
      this.setSession(next);
      successCallback();
    });
  }

  register(request: RegRequest, errorCallback, successCallback): void {
    this.httpClient
      .put<UserAuthResponse>(`${this.apiUrl}/auth/register`, request).pipe(
      catchError(err => {
        errorCallback(err);
        throw err;
      })
    ).subscribe(next => {
      this.setSession(next);
      successCallback();
    });
  }

  private setSession(authResult: UserAuthResponse): void {
    localStorage.setItem('User', JSON.stringify(authResult));
  }

  clearSession(): void {
    localStorage.removeItem('User');
  }

  public tokenOutdated(): boolean {
    return this.getUser().expiresIn < new Date().getTime();
  }
}
