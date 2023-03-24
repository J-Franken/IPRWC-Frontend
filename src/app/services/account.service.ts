import {Injectable} from "@angular/core";
import {Account} from "../model/account.model";


@Injectable({
    providedIn: "root"
  })

export class AccountService {


  constructor() {
  }

  setAccount(account: Account): void {
    localStorage.setItem('account', JSON.stringify(account));
  }

  getAccount(): Account {
    return JSON.parse(localStorage.getItem('account')!);
  }

  getJWT():string {
    return localStorage.getItem('jwt')!;
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
