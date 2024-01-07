import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';  
import { of } from 'rxjs';  

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private apiUrl = 'http://localhost:8080/api/coupons'; 

  constructor(private http: HttpClient) {}

  checkCouponCode(couponCode: string): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}/${couponCode}`, { observe: 'response' }).pipe(
      map(response => {
        if (response.status === 200) {
          return 'Coupon is valid!';
        } else {
          return 'Coupon is not valid.';
        }
      }),
      catchError(error => {
        if (error.status === 404) {
          return of('Coupon is not valid.');
        } else {
          return of('Error validating coupon code.');
        }
      })
    );
  }
}