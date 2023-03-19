import {Injectable, Input} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
    providedIn: "root"
  }
)
export class AccountService {


  constructor(private http: HttpClient) {
  }

  // setAccount(account: Account): void {
  //   localStorage.setItem('employee', JSON.stringify(account));
  // }
  //
  // getAccount(): Account {
  //   return JSON.parse(localStorage.getItem('account'));
  // }
  //
  // getJWT():string {
  //   return localStorage.getItem('jwt');
  // }
  //
  // setJWT(jwt: string): void {
  //   localStorage.setItem('jwt', jwt);
  // }
  //
  // destroyJWT() {
  //   localStorage.removeItem('jwt');
  // }
  // destroyUser(){
  //   localStorage.removeItem('account')
  // }

}
