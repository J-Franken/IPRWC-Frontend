import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';  
import { of } from 'rxjs';  
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  constructor(private http: HttpClient) {}

  checkCouponCode(couponCode: string): Observable<string> {
    return this.http.get<any>(`${environment.apiKey}/${couponCode}`, { observe: 'response' }).pipe(
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