import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AccountService} from "./account.service";
import {environment} from "../environments/environment";
import {catchError, map, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {ApiResponse} from "../interfaces/apiResponse.interface";
import { Account } from "../model/account.model";

@Injectable({
  providedIn: "root"
})

export class AuthService {

  constructor(private http: HttpClient,
              private accountService: AccountService) {
  }


  registerHandler(account: Account) {
    return this.http.post(environment.apiKey + 'auth/register', account)
      .pipe(
        tap((data: any) => {
          if (data.code === 'ACCEPTED') {
            this.accountService.setJWT(data.message);
          } else {
            throw new Error(data.message ?? 'Unknown error');
          }
        }),
        catchError(() => {
          throw new Error('Unable to register user account. Please try again later.')
        })
      );
  }

  loginHandler(credentials: Object) {
    return this.http.post(environment.apiKey + 'auth/login', credentials)
      .pipe(
        tap((data: any) => {
          if (data.code === 'ACCEPTED') {
            this.accountService.setJWT(data.message);
          } else {
            throw new Error(data.message ?? 'Unknown error');
          }
        }),
        catchError(() => {
          throw new Error('Unable to login. Please check your credentials and try again.')
        })
      );
  }


  infoHandler() {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.accountService.getJWT()})
    return this.http.get(environment.apiKey + 'auth/info',
      {
        headers: header
      }).pipe(map((data: any) => {
      if (data.code === 'ACCEPTED') {
        return data.payload;
      } else {
        throw new Error(data.payload)
      }
    }));
  }

  validSession(): boolean {
    return this.accountService.getJWT() != undefined;
  }
}

