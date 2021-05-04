import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthEmailRequest} from '../../../api/request/AuthEmailRequest';
import {AuthUsernameRequest} from '../../../api/request/AuthUsernameRequest';
import {AuthRequest} from '../../../api/request/AuthRequest';
import {AuthRequestType} from '../../../api/model/auth/AuthRequestType';

export function ValidateUrl(control: AbstractControl) {
  if (control.value) {
    if (control.value.includes('@')) {
      return Validators.email(control) ? {invalidLogin: true} : null;
    }
    return null;
  }
  return {invalidLogin: true};
}


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit, OnChanges {
  @Input() isActive: boolean = false;
  @Input() onSuccess;
  @Input() onCancel;
  @Input() changeModal;
  @ViewChild('password') passwordElement;
  @Input() isSubmitDisabled: boolean = false;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      login: ['', [Validators.required, ValidateUrl, Validators.pattern(/^[\S\s]{8,32}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^[\S\s]{8,16}$/)]],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    const loginValue: string = this.form.controls.login.value;
    const passwordValue: string = this.form.controls.password.value;
    if (this.form.valid) {
      if (loginValue.includes('@')) {
        this.onSuccess(new AuthRequest(AuthRequestType.EMAIL_AUTH, new AuthEmailRequest(loginValue, passwordValue)));
      } else {
        this.onSuccess(new AuthRequest(AuthRequestType.USERNAME_AUTH, new AuthUsernameRequest(loginValue, passwordValue)));
      }
      this.form.controls.password.reset();
    }
  }

  onEmailEntered(event): void {
    event.preventDefault();
    this.passwordElement.nativeElement.focus();
  }

  onPasswordEntered(event): void {
    event.preventDefault();
    this.submitForm();
  }

  onRegisterClick(event): void {
    event.preventDefault();
    this.changeModal();
  }

  onBackClick(): void {
    this.onCancel();
  }
}
