import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../api/service/user.service';
import {ProductCreateRequest} from '../../../../api/request/product/ProductCreateRequest';
import {ProductService} from '../../../../api/service/product.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  @Input() cancel;
  @Input() success;
  @Input() isActive;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              public userService: UserService,
              private productService: ProductService) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(/^[\S\s]{8,100}$/)]],
      description: ['', [Validators.required, Validators.pattern(/^[\S\s]{8,1000}$/)]],
      photo: [null],
      userId: [null]
    });
  }

  initFormValues(): void {
    this.form.controls.userId.setValue(this.userService.userProfile.value.id);
  }

  ngOnInit(): void {
    this.initFormValues();
  }

  onBackClick(): void {
    this.cancel();
  }

  createProduct(): void {
    const request: ProductCreateRequest = this.form.value;
    this.productService.createProduct(request).subscribe((product) => {
      this.success(product);
    });
  }

}
