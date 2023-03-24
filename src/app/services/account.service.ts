import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Account} from "../model/account.model";


@Injectable({
    providedIn: "root"
  }
)
export class AccountService {


  constructor(private http: HttpClient) {
  }

  setAccount(account: Account): void {
    localStorage.setItem('account', JSON.stringify(account));
  }

  getAccount(): Account | null {
    const accountString = localStorage.getItem('account');
    if (accountString === null) {
      return null;
    }
    return JSON.parse(accountString);
  }

  getJWT():string | null {
    return localStorage.getItem('jwt');
  }

  setJWT(jwt: string): void {
    localStorage.setItem('jwt', jwt);
  }

  destroyJWT() {
    localStorage.removeItem('jwt');
  }
  destroyUser(){
    localStorage.removeItem('account')
  }

}
