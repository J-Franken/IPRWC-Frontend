import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {Account} from "../model/account.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    collapsed = true;

    admin!: boolean
    account!: Account

    constructor(private accountService:AccountService, private _snackBar: MatSnackBar) {
    }

  ngOnInit() {
    const account = this.accountService.getAccount();
    if (account !== null) {
      this.account = account
      this.admin = account.admin
    }
  }

  logOut(){
    this.accountService.destroyJWT();
    this.accountService.destroyUser();
    return this._snackBar.open("You have successfully logged out", 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'right'
    });
  }
}
