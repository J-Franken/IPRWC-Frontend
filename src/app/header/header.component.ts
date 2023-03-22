import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    collapsed = true;

    admin: boolean = false;

    constructor(private accountService:AccountService) {
    }

  ngOnInit() {
    const account = this.accountService.getAccount();
    if (account !== null) {
      this.admin = account.admin;
    }
  }
}
