import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Product} from "../model/product.model";
import {environment} from "../environments/environment";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private accountService: AccountService) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiKey + 'products');
  }

  public addProduct(product: Product) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.accountService.getJWT()})
    return this.http.post(environment.apiKey + 'products', product, {
      headers: header
    })
      .pipe(map((productData: any) => {
        if (productData.code === 'ACCEPTED') {
          return productData.payload;
        } else {
          throw new Error(productData.payload)
        }
      }));
  }

  public updateProduct(product: Product) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.accountService.getJWT()})
    return this.http.put(environment.apiKey + 'products/' + product.id, product, {
      headers: header
    })
      .pipe(map((productData: any) => {
        if (productData.code === 'ACCEPTED') {
          return productData.payload;
        } else {
          throw new Error(productData.payload)
        }
      }));
    }

  public deleteProduct(id: number) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.accountService.getJWT()})
    return this.http.delete(environment.apiKey + 'products/' + id, {
      headers: header
    })
      .pipe(map((productData: any) => {
        if (productData.code === 'ACCEPTED') {
          return productData.payload;
        } else {
          throw new Error(productData.payload)
        }
      }));
    }

    getSelectedProduct(productId: number): Observable<Product> {
      return this.http.get<Product>(`${environment.apiKey}products/${productId}`);
    }
}
