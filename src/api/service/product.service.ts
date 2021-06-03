import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductsResponse} from '../response/products/ProductsResponse';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from '../model/product/Product';
import {ProductCreateRequest} from '../request/product/ProductCreateRequest';
import {Auction} from '../model/auction/Auction';
import {ProductTitleUpdateRequest} from '../request/product/ProductTitleUpdateRequest';
import {ProductDescriptionUpdateRequest} from '../request/product/ProductDescriptionUpdateRequest';
import {ProductPhotoUpdateRequest} from '../request/product/ProductPhotoUpdateRequest';
import {PaginationResponse} from '../response/pagination/PaginationResponse';

@Injectable()
export class ProductService {

  apiUrl: string;
  isInited: boolean = false;

  constructor(private config: ConfigService,
              private httpClient: HttpClient) {
    this.apiUrl = `http://52.58.171.243:3000/products`;
    // setTimeout(() => {
    //
    // }, 2000);
  }

  // setProducts(products: Array<Product>): void {
  //   this.allProducts.next(products);
  // }

  // initAllProducts(): Observable<Array<Product>> {
  //   return this.httpClient.get<Array<Product>>(`${this.apiUrl}/all`);
  // }

  createProduct(request: ProductCreateRequest): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/create`, request);
  }

  // addProduct(product: Product): void {
  //   const currentArray = this.allProducts.value;
  //   currentArray.push(product);
  //   this.allProducts.next(currentArray);
  // }

  // removeProductFromList(id: number): void {
  //   const currentArray = this.allProducts.value;
  //   const index = currentArray.map(x => x.id).indexOf(id);
  //   currentArray.splice(index, 1);
  //   this.allProducts.next(currentArray);
  // }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/id/${id}`);
  }

  updateUserProductTitle(id: number, request: ProductTitleUpdateRequest): Observable<Product> {
    return this.httpClient.patch<Product>(`${this.apiUrl}/${id}/title`, request);
  }

  updateUserProductDescription(id: number, request: ProductDescriptionUpdateRequest): Observable<Product> {
    return this.httpClient.patch<Product>(`${this.apiUrl}/${id}/description`, request);
  }

  updateUserProductPhoto(id: number, request: ProductPhotoUpdateRequest): Observable<Product> {
    return this.httpClient.patch<Product>(`${this.apiUrl}/${id}/photo`, request);
  }

  // changeProductNickname(productId: number, title: ProductTitleUpdateRequest): void {
  //   this.allProducts.next(this.allProducts.getValue().map(product => product.id === productId ? Object.assign(product, title) : product));
  // }

  // changeProductDescription(productId: number, description: ProductDescriptionUpdateRequest): void {
  //   this.allProducts.next(this.allProducts.getValue().map(product => product.id === productId ? Object.assign(product, description) : product));
  // }

  deleteUserProduct(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.apiUrl}/${id}`);
  }

  // public initProducts(products: Array<Product>): void {
  //   this.isInited = true;
  //   this.setProductsList(products);
  // }

  // setProductsList(products: Array<Product>): void {
  //   this.allProducts.next(products);
  // }
}
