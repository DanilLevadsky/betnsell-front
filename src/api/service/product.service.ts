import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductsResponse} from '../response/products/ProductsResponse';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product/Product';
import {ProductCreateRequest} from '../request/product/ProductCreateRequest';
import {Auction} from '../model/auction/Auction';

@Injectable()
export class ProductService {

  apiUrl: string;
  allProducts: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);
  isInited: boolean = false;

  constructor(private config: ConfigService,
              private httpClient: HttpClient) {
    this.apiUrl = `http://127.0.0.1:3000/products`;
    // setTimeout(() => {
    //
    // }, 2000);
  }

  setProducts(products: Array<Product>): void {
    this.allProducts.next(products);
  }

  // initAllProducts(): Observable<Array<Product>> {
  //   return this.httpClient.get<Array<Product>>(`${this.apiUrl}/all`);
  // }

  createProduct(request: ProductCreateRequest): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/create`, request);
  }

  addProduct(product: Product): void {
    const currentArray = this.allProducts.value;
    currentArray.push(product);
    this.allProducts.next(currentArray);
  }

  removeProductFromList(id: number): void {
    const currentArray = this.allProducts.value;
    let index = currentArray.map(x => x.id).indexOf(id);
    currentArray.splice(index, 1);
    this.allProducts.next(currentArray);
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/id/${id}`);
  }

  getUserProducts(id: number): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${this.apiUrl}/user/${id}`);
  }

  updateUserProduct(id: number, request: Product): Observable<Product> {
    return this.httpClient.patch<Product>(`${this.apiUrl}/update/${id}`, request);
  }

  deleteUserProduct(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.apiUrl}/delete/${id}`);
  }

  public initProducts(products: Array<Product>): void {
    this.isInited = true;
    this.setProductsList(products);
  }

  setProductsList(products: Array<Product>): void {
    this.allProducts.next(products);
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<Auction>(`${this.apiUrl}/delete/${id}`);
  }
}
