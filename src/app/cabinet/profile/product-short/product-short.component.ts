import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../api/model/product/Product';
import {ProductService} from '../../../../api/service/product.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ImageConstants} from '../../../../api/constants/ImageConstants';

@Component({
  selector: 'app-product',
  templateUrl: './product-short.component.html',
  styleUrls: ['./product-short.component.css']
})
export class ProductShortComponent implements OnInit {

  @Input() product: Product;
  @Input() onDelete;
  @Input() onEdit;
  @Input() onAuctionCreate;
  isEditModalOpened: boolean = false;

  constructor(private productService: ProductService,
              private notifications: NzNotificationService) {
  }

  get imageConstants(): typeof ImageConstants {
    return ImageConstants;
  }

  ngOnInit(): void {
  }

  deleteProduct(id: number): void {
    this.productService.deleteUserProduct(id).subscribe(() => {
      this.onDelete(id);
      this.notifications.success('Успех!', 'Вы удачно удалили товар');
    });
  }

  onSuccessEditModal = (updatedProduct: Product) => {
    this.onEdit(updatedProduct);
    this.onCloseEditModal();
  };

  onCloseEditModal = () => {
    this.isEditModalOpened = false;
  };

  onOpenEditModal = () => {
    this.isEditModalOpened = true;
  }

  onCreateAuctionClick(): void {
    this.onAuctionCreate(this.product);
  }

}
