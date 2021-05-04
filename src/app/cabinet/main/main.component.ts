import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProductService} from '../../../api/service/product.service';
import {Product} from '../../../api/model/product/Product';
import {ImageConstants} from '../../../api/constants/ImageConstants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription> = [];
  products: Array<Product> = [];

  constructor(private productsService: ProductService) {
  }

  get ImageConstants(): typeof ImageConstants {
    return ImageConstants;
  }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  initSubscriptions(): void {
    this.subscriptions.push(this.productsService.allProducts.subscribe(products => this.products = products));
  }

}
