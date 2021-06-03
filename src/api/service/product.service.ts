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
  }

  createProduct(request: ProductCreateRequest): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/create`, request);
  }

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


  deleteUserProduct(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.apiUrl}/${id}`);
  }
}
