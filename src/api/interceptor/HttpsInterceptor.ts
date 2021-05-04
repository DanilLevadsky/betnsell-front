import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ConfigService} from '../service/config.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import ErrorUtil from '../utils/ErrorUtil';
import {Injectable} from '@angular/core';
import {AuthService} from '../service/auth.service';

@Injectable()
export class HttpsInterceptor implements HttpsInterceptor {

  constructor(private config: ConfigService,
              private notificationService: NzNotificationService,
              private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getUser()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getUser().jwt}`
        }
      });
    }
    return next.handle(req);
  }
}
