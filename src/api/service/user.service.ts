import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {UserAuthResponse} from '../response/auth/UserAuthResponse';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductsResponse} from '../response/products/ProductsResponse';
import {UserResponse} from '../response/users/UserResponse';
import {UserChangeRequest} from '../request/UserChangeRequest';
import {UpdatedUserUsername} from '../request/user/UpdatedUserUsername';
import {UpdatedUserEmail} from '../request/user/UpdatedUserEmail';
import {UpdatedUserPassword} from '../request/user/UpdatedUserPassword';
import {UpdatedUserName} from '../request/user/UpdatedUserName';
import {UpdatedUserMobile} from '../request/user/UpdatedUserMobile';

@Injectable()
export class UserService {

  apiUrl: string;
  userProfile: BehaviorSubject<UserResponse> = new BehaviorSubject<UserResponse>(null);
  isInited: boolean = false;

  constructor(private config: ConfigService,
              private httpClient: HttpClient) {
    this.apiUrl = `http://127.0.0.1:3000/users`;
    // setTimeout(() => {
    //
    // }, 2000);
  }

  updateUserUsername(updatedUsername: UpdatedUserUsername): Observable<UserResponse> {
    return this.httpClient.patch<UserResponse>(`${this.apiUrl}/update/username`, updatedUsername);
  };

  updateUserEmail(updatedUserEmail: UpdatedUserEmail): Observable<UserResponse> {
    return this.httpClient.patch<UserResponse>(`${this.apiUrl}/update/email`, updatedUserEmail);
  };

  updateUserPassword(updatedUserPassword: UpdatedUserPassword): Observable<UserResponse> {
    return this.httpClient.patch<UserResponse>(`${this.apiUrl}/update/password`, updatedUserPassword);
  };

  updateUserName(updatedUserName: UpdatedUserName): Observable<UserResponse> {
    return this.httpClient.patch<UserResponse>(`${this.apiUrl}/update/name`, updatedUserName);
  };

  updateUserMobile(updatedUserMobile: UpdatedUserMobile): Observable<UserResponse> {
    return this.httpClient.patch<UserResponse>(`${this.apiUrl}/update/mobile`, updatedUserMobile);
  };

  deleteUser(): Observable<UserResponse> {
    return this.httpClient.delete<UserResponse>(`${this.apiUrl}/delete`);
  };

  getUser(): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(`${this.apiUrl}/`);
  }

  setUser(user: UserResponse): void {
    this.userProfile.next(user);
  }

  changeEmail(email: UpdatedUserEmail): void {
    this.setUser(Object.assign(this.userProfile.getValue(), email));
  }

  changeNickname(nickname: UpdatedUserUsername): void {
    this.setUser(Object.assign(this.userProfile.getValue(), nickname));
  }

  changeName(name: UpdatedUserName): void {
    this.setUser(Object.assign(this.userProfile.getValue(), name));
  }

  changeMobile(mobile: UpdatedUserMobile): void {
    this.setUser(Object.assign(this.userProfile.getValue(), mobile));
  }
}
