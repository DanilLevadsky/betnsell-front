import {ErrorHandler, Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse, HttpEvent} from '@angular/common/http';
import ErrorUtil from '../utils/ErrorUtil';
import {EMPTY, Observable} from 'rxjs';
import {ConfigService} from '../service/config.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {environment} from '../../environments/environment';

@Injectable()
export class GlobalErrorInterceptor implements ErrorHandler {

  constructor(private config: ConfigService,
              private notificationService: NzNotificationService) {
  }

  handleError(error: Error) {
    this.notificationService.error('Ошибка!', `${ErrorUtil.getErrorMessage(error)}`);
    if (!environment.production) {
      throw error;
    }
    return EMPTY;
  }

}
