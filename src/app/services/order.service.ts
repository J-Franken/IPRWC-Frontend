import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Order} from "../model/order.model";
import {environment} from "../environments/environment";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private accountService: AccountService) { }

  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(environment.apiKey);
  }

  addOrder(order: Order){
    let header = new HttpHeaders({"Authorization": "Bearer " + this.accountService.getJWT()})
    return this.http.post(environment.apiKey + 'orders', order, {
      headers: header
    })
      .pipe(map((orderData: any) => {
        if (orderData.code === 'ACCEPTED') {
          return orderData.payload;
        } else {
          throw new Error(orderData.payload)
        }
      }));
  }
}
