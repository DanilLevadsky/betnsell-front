import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserResponse} from '../../../../api/response/users/UserResponse';
import {Subscription} from 'rxjs';
import {UserService} from '../../../../api/service/user.service';
import {AuctionConstants} from '../../../../api/constants/AuctionConstants';
import {BalanceRequest} from '../../../../api/request/user/BalanceRequest';

@Component({
  selector: 'app-balance-modal',
  templateUrl: './balance-modal.component.html',
  styleUrls: ['./balance-modal.component.css']
})
export class BalanceModalComponent implements OnInit, OnDestroy {

  @Input() cancel;
  @Input() success;
  @Input() isActive;
  form: FormGroup;
  user: UserResponse;
  subscriptions: Array<Subscription> = [];
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder,
              public userService: UserService) {
    this.form = this.fb.group({
      refill: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(this.userService.userProfile.subscribe(user => {
      this.user = user;
    }));
  }

  onBackClick(): void {
    this.cancel();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  refillBalance(): void {
    this.userService.updateBalance(new BalanceRequest(this.form.controls.refill.value)).subscribe(() => {
      this.userService.changeBalance(this.user.balance + this.form.controls.refill.value);
      this.success();
    });
  }

}
