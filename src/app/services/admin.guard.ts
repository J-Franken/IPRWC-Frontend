import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
  } from '@angular/router';
  import {Injectable} from '@angular/core';
  import {Observable} from 'rxjs';
  import {AccountService} from "./account.service";
  import {AuthService} from './auth.service';
  
  @Injectable({providedIn: 'root'})
  export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private accountService: AccountService) {
    }
  
  
    canActivate(
      route: ActivatedRouteSnapshot,
      router: RouterStateSnapshot
    ):
      | boolean
      | UrlTree
      | Promise<boolean | UrlTree>
      | Observable<boolean | UrlTree> {
        const account = this.accountService.getAccount();
      if (account?.admin === true) {
        return true;
      } else {
        return this.router.createUrlTree(['/']);
      }
    }
  }