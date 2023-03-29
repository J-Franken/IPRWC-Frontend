import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Product} from "../model/product.model";
import { environment } from '../environments/environment';
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://iprwc-cc6b9.web.app/api/';

  constructor(private http: HttpClient, private accountService: AccountService) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  public addProduct(product: Object) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.accountService.getJWT()})
    return this.http.post(environment.apiKey + 'products', product, {
      headers: header
    })
      .pipe(map((data: any) => {
        if (data.code === 'ACCEPTED') {
          return data.payload;
        } else {
          throw new Error(data.payload)
        }
      }));
  }
}
