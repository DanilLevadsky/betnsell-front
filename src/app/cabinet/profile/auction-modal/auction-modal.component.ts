import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../api/service/user.service';
import {ProductService} from '../../../../api/service/product.service';
import {ProductCreateRequest} from '../../../../api/request/product/ProductCreateRequest';
import {UserResponse} from '../../../../api/response/users/UserResponse';
import {Subscription} from 'rxjs';
import {AuctionsService} from '../../../../api/service/auctions.service';
import {AuctionCreateRequest} from '../../../../api/request/auction/AuctionCreateRequest';

@Component({
  selector: 'app-auction-modal',
  templateUrl: './auction-modal.component.html',
  styleUrls: ['./auction-modal.component.css']
})
export class AuctionModalComponent implements OnInit, OnDestroy {

  @Input() onCancel;
  @Input() onSuccess;
  @Input() isActive;
  @Input() productId: number;
  form: FormGroup;
  user: UserResponse;
  subscriptions: Array<Subscription> = [];

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private auctionService: AuctionsService) {
    this.form = this.fb.group({
      lotFinishDate: [null, [Validators.required]],
      lotExpireDate: [null],
      productId: [null, [Validators.required]]
    });
  }

  initFormValues(): void {
    if (this.productId) {
      this.form.controls.productId.setValue(this.productId);
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(this.userService.userProfile.subscribe(user => this.user = user));
    this.initFormValues();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onBackClick(): void {
    this.onCancel();
  }

  createAuction(): void {
    this.form.controls.lotFinishDate.setValue('2021-05-21T21:55:26.513Z');
    console.log(this.form.controls.lotFinishDate.value);
    this.form.controls.lotExpireDate.setValue('2021-05-21T21:55:26.513Z');
    console.log(this.form.controls.lotExpireDate.value);
    const request: AuctionCreateRequest = this.form.value;
    this.auctionService.createAuction(request).subscribe((auction) => {
      this.onSuccess(auction);
    });
  }

}
