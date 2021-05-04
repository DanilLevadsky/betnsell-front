import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegRequest} from '../../../api/request/RegRequest';


@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {
  @Input() isActive: boolean = false;
  @Input() onSuccess;
  @Input() onCancel;
  @Input() changeModal;
  @ViewChild('password') passwordElement;
  @ViewChild('nickname') nicknameElement;
  @ViewChild('confirm') confirmElement;
  @Input() isSubmitDisabled: boolean = false;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern(/^[\S\s]{8,16}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^[\S\s]{8,16}$/)]],
      confirm: ['', [Validators.required, this.confirmValidator]]
    });
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.valid) {
      const request = new RegRequest(this.form.controls.email.value, this.form.controls.username.value, this.form.controls.password.value);
      this.onSuccess(request);
      this.form.reset();
    }
  }

  onEmailEntered(event): void {
    event.preventDefault();
    this.nicknameElement.nativeElement.focus();
  }

  onNickNameEntered(event): void {
    event.preventDefault();
    this.passwordElement.nativeElement.focus();
  }

  onPasswordEntered(event): void {
    event.preventDefault();
    this.confirmElement.nativeElement.focus();
  }

  onConfirmEntered(event): void {
    event.preventDefault();
    this.submitForm();
  }

  confirmValidator = (control): { [s: string]: boolean } => {
    if (!control.value) {
      return {error: true, required: true};
    } else if (control.value !== this.form.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  };

  onBackClick(): void {
    this.changeModal();
  }

}
