import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AccountService} from "./account.service";
import {environment} from "../environments/environment";
import {catchError, map, tap} from "rxjs";
import {Injectable} from "@angular/core";
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
        tap((registerForm: any) => {
          if (registerForm.code === 'ACCEPTED') {
            this.accountService.setJWT(registerForm.message);
          } else {
            throw new Error(registerForm.message ?? 'Unknown error');
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
        tap((loginCredentials: any) => {
          if (loginCredentials.code === 'ACCEPTED') {
            this.accountService.setJWT(loginCredentials.message);
          } else {
            throw new Error(loginCredentials.message ?? 'Unknown error');
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
      }).pipe(map((informationData: any) => {
      if (informationData.code === 'ACCEPTED') {
        return informationData.payload;
      } else {
        throw new Error(informationData.payload)
      }
    }));
  }

  validSession(): boolean {
    return this.accountService.getJWT() != undefined;
  }
}

