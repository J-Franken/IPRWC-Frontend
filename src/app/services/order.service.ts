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

  private apiUrl = 'https://iprwc-cc6b9.web.app/api/';

  constructor(private http: HttpClient, private accountService: AccountService) { }

  // get orders from API
  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // add new order to API
  addOrder(order: Object){
    let header = new HttpHeaders({"Authorization": "Bearer " + this.accountService.getJWT()})
    return this.http.post(environment.apiKey + 'orders', order, {
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
