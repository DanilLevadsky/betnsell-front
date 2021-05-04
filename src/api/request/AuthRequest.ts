import {AuthRequestType} from '../model/auth/AuthRequestType';
import {AuthEmailRequest} from './AuthEmailRequest';
import {AuthUsernameRequest} from './AuthUsernameRequest';

export class AuthRequest {
  type: AuthRequestType;
  request: AuthEmailRequest | AuthUsernameRequest;

  constructor(type: AuthRequestType, request: AuthEmailRequest | AuthUsernameRequest) {
    this.type = type;
    this.request = request;
  }
}
