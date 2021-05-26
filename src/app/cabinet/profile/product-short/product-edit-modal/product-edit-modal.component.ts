import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../../api/service/user.service';
import {UserResponse} from '../../../../../api/response/users/UserResponse';
import {Product} from '../../../../../api/model/product/Product';
import {forkJoin, Subscription} from 'rxjs';
import {flatMap, mergeMap} from 'rxjs/operators';
import {ProductService} from '../../../../../api/service/product.service';
import {ProductTitleUpdateRequest} from '../../../../../api/request/product/ProductTitleUpdateRequest';
import {ProductDescriptionUpdateRequest} from '../../../../../api/request/product/ProductDescriptionUpdateRequest';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit, OnDestroy {

  @Input() onCancel;
  @Input() onSuccess;
  @Input() isActive;
  @Input() product: Product;
  form: FormGroup;
  subscriptions: Array<Subscription> = [];
  isTitleChanged: boolean = false;
  isDescriptionChanged: boolean = false;

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private notificationService: NzNotificationService) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(/^[\S\s]{8,100}$/)]],
      description: ['', [Validators.required, Validators.pattern(/^[\S\s]{8,1000}$/)]],
      photo: [null]
    });
  }

  ngOnInit(): void {
    this.initFormValues();
    this.initFormValueChanges();
  }

  initFormValues(): void {
    this.form.controls.title.setValue(this.product.title);
    this.form.controls.description.setValue(this.product.description);
  }

  initFormValueChanges(): void {
    this.form.controls.title.valueChanges.subscribe((value) => {
      this.isTitleChanged = value !== this.product.title;
    });
    this.form.controls.description.valueChanges.subscribe((value) => {
      this.isDescriptionChanged = value !== this.product.description;
    });
  }

  onBackClick(): void {
    this.onCancel();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onSaveButtonClick(): void {
    let requests: Array<any> = [];
    if (this.isTitleChanged) {
      requests.push(this.productService.updateUserProductTitle(this.product.id,
        new ProductTitleUpdateRequest(this.form.controls.title.value)));
    }
    if (this.isDescriptionChanged) {
      requests.push(this.productService.updateUserProductDescription(this.product.id,
        new ProductDescriptionUpdateRequest(this.form.controls.description.value)));
    }
    forkJoin(...requests).subscribe(() => {
      let updatedProduct: Product = this.product;
      if (this.isTitleChanged){
        Object.assign(updatedProduct, new ProductTitleUpdateRequest(this.form.controls.title.value));
      }
      if (this.isDescriptionChanged){
        Object.assign(updatedProduct, new ProductDescriptionUpdateRequest(this.form.controls.description.value));
      }
      this.onSuccess(updatedProduct);
      this.notificationService.success('Успех!', 'Вы удачно обновили данные продукта')
    });
  }


}
