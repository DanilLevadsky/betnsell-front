import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mapTo, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class ConfigService{
  configuration = {};

  constructor(private httpClient: HttpClient) {
  }

  load(): Observable<void> {
    return this.httpClient.get('/assets/config.json')
      .pipe(
        tap((configuration: any) => {
          this.configuration = configuration
        }),
        mapTo(undefined),
      );
  }

  getApiEndpoint(): string {
    return environment.production ?
      `${location.protocol}//${location.host}/api/v${this.getValue('apiVersion')}` : this.getValue('api');
  }

  getValue(key: string): any {
    return this.configuration[key];
  }

}
