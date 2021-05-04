import {Component, OnInit} from '@angular/core';
import {AuthEmailRequest} from '../../api/request/AuthEmailRequest';
import {RegRequest} from '../../api/request/RegRequest';
import {AuthService} from '../../api/service/auth.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../api/service/config.service';
import {AuthUsernameRequest} from '../../api/request/AuthUsernameRequest';
import {AuthRequest} from '../../api/request/AuthRequest';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  isSubmitDisabled: boolean = false;
  isRegModalActive: boolean = false;
  isLoginModalActive: boolean = false;

  constructor(private auth: AuthService,
              private router: Router,
              private config: ConfigService) {
  }

  ngOnInit(): void {
  }

  handleLogin = (value: AuthRequest): void => {
    this.isSubmitDisabled = true;
    this.auth.login(value, this.onError, this.handleAuth);
  };

  handleRegister = (value: RegRequest) => {
    this.isSubmitDisabled = true;
    this.auth.register(value, this.onError, this.handleAuth);
  };

  onError = () => {
    console.log('ERROR');
    this.isSubmitDisabled = false;
  }

  handleAuth = () => {
    this.isSubmitDisabled = false;
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/cabinet']);
    } else if (this.auth.tokenOutdated()) {
      this.auth.clearSession();
    }
  };

  onCancelRegModal = (): void => {
    this.isRegModalActive = false;
  };

  onCancelLoginModal = (): void => {
    this.isLoginModalActive = false;
  };

  onOpenRegModal = (): void => {
    this.isRegModalActive = true;
  }

  onOpenLoginModal = (): void => {
    this.isLoginModalActive = true;
  }

  changeLoginToRegModal = (): void => {
    this.onCancelLoginModal();
    this.onOpenRegModal();
  }

  changeRegToLoginModal = (): void => {
    this.onCancelRegModal();
    this.onOpenLoginModal();
  }


}
