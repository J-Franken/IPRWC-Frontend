import {Injectable} from "@angular/core";
import {catchError, map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";
import { ApiResponse } from "../interfaces/apiResponse.interface";
import { AccountService } from "./account.service";
import { Promo } from "../model/promo.model";

@Injectable({
  providedIn: 'root'
})
export class PromocodeService{

    constructor(private http: HttpClient,
                private accountService: AccountService) {
    }

    public getAllPromoCodes(): Observable<Promo[]> {
        return this.http.get<Promo[]>(environment.apiKey + 'promocode');
      }


    public addPromoCode(newPromoCode: Object): Observable<void> {
        let header = new HttpHeaders({"Authorization": "Bearer " + this.accountService.getJWT()})
        return this.http.post<ApiResponse>(environment.apiKey + 'promocode', newPromoCode, {
            headers: header
        })
            .pipe(map(promoCodeData => {
                if (promoCodeData.code === 'ACCEPTED') {
                } else {
                    throw new Error(promoCodeData.message)
                }
            }));
    }

    public updatePromocode(promoCode: Promo) {
        let header = new HttpHeaders({"Authorization": "Bearer " + this.accountService.getJWT()})
        return this.http.put(environment.apiKey + 'promocode/' + promoCode.id, promoCode, {
          headers: header
        })
          .pipe(map((promoCodeData: any) => {
            if (promoCodeData.code === 'ACCEPTED') {
              return promoCodeData.payload;
            } else {
              throw new Error(promoCodeData.payload)
            }
          }));
        }

    public deletePromoCode(promoId: number): Observable<void> {
        let header = new HttpHeaders({"Authorization": "Bearer " + this.accountService.getJWT()})
        return this.http.delete<ApiResponse>(environment.apiKey + 'promocode/' + promoId, {
            headers: header
        })
            .pipe(map(promoCodeData => {
                if (promoCodeData.code === 'ACCEPTED') {
                } else {
                    throw new Error(promoCodeData.message)
                }
            }));
    }

    public getSelectedCoupon(promoId: number): Observable<Promo> {
        return this.http.get<Promo>(`${environment.apiKey}promocode/${promoId}`);
      }
}