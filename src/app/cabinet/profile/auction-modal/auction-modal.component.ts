import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../api/service/user.service';
import {ProductService} from '../../../../api/service/product.service';
import {ProductCreateRequest} from '../../../../api/request/product/ProductCreateRequest';
import {UserResponse} from '../../../../api/response/users/UserResponse';
import {Subscription} from 'rxjs';
import {AuctionsService} from '../../../../api/service/auctions.service';
import {AuctionCreateRequest} from '../../../../api/request/auction/AuctionCreateRequest';
import {AuctionConstants} from '../../../../api/constants/AuctionConstants';
import {Product} from '../../../../api/model/product/Product';

@Component({
  selector: 'app-auction-modal',
  templateUrl: './auction-modal.component.html',
  styleUrls: ['./auction-modal.component.css']
})
export class AuctionModalComponent implements OnInit, OnDestroy, OnChanges {

  @Input() onCancel;
  @Input() onSuccess;
  @Input() isActive;
  @Input() product: Product;
  form: FormGroup;
  user: UserResponse;
  subscriptions: Array<Subscription> = [];
  currentPrice: number;
  products: Array<Product> = [];
  currentPage: number = 1;
  totalPages: number;
  isProductsLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private auctionService: AuctionsService,
              private productService: ProductService) {
    this.form = this.fb.group({
      pricePerTicket: [AuctionConstants.MIN_TICKET_PRICE, [Validators.required, Validators.pattern(/^((?!(0))[1-9]|1[0-9]|2[0-5])$/)]],
      totalTickets: [AuctionConstants.MIN_TICKETS_AMOUNT, [Validators.required, Validators.pattern(/^((?!(0))[5-9]|[1-9][0-9]|10[0-9]|1[1-9]\d|2[0-4]\d|250)$/)]],
      productId: [null, [Validators.required]]
    });
  }

  get auctionConstants(): typeof AuctionConstants {
    return AuctionConstants;
  }

  initFormValues(): void {
    const pricePerTicket = this.form.controls.pricePerTicket;
    const totalTickets = this.form.controls.totalTickets;
    this.currentPrice = pricePerTicket.value * totalTickets.value;
    this.subscriptions.push(pricePerTicket.valueChanges.subscribe(value => {
      if (value) {
        this.updateCurrentPrice();
      }
    }));
    this.subscriptions.push(totalTickets.valueChanges.subscribe(value => {
      if (value) {
        this.updateCurrentPrice();
      }
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product) {
      if (changes.product.currentValue) {
        if (!this.products.find(prod => prod.id === changes.product.currentValue.id)){
          this.products.push(this.product);
        }
        this.form.controls.productId.setValue(this.product.id);
        // this.form.controls.productId.disable();
      } else {
        this.form.reset();
        this.form.controls.productId.enable();
      }
    }
  }

  updateCurrentPrice(): void {
    this.currentPrice = this.form.controls.pricePerTicket.value * this.form.controls.totalTickets.value;
  }

  ngOnInit(): void {
    this.user = this.userService.userProfile.getValue();
    this.subscriptions.push(this.userService.userProfile.subscribe(user => this.user = user));
    this.userService.getUserProducts(this.user.id).subscribe(products => {
      this.currentPage = products.currentPage;
      this.totalPages = products.totalPages;
      this.products = products.content;
    });
    this.initFormValues();
  }

  updateProducts(): void {
    if (this.currentPage !== this.totalPages) {
      this.isProductsLoading = true;
      this.userService.getUserProducts(this.user.id, this.currentPage + 1).subscribe(products => {
        this.currentPage += 1;
        this.isProductsLoading = false;
        products.content.forEach(product => this.products.push(product));
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onBackClick(): void {
    this.onCancel();
  }

  createAuction(): void {
    const request: AuctionCreateRequest = this.form.value;
    this.auctionService.createAuction(request).subscribe((auction) => {
      this.onSuccess(auction);
    });
  }
}
