import {Component, ViewChild} from '@angular/core';
import {AccountService} from "../services/account.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Account} from "../model/account.model";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;
  loginForm!: FormGroup;
  loginSubscription!: Subscription;
  infoSubscription!: Subscription;

  constructor(private router: Router,
              private accountService: AccountService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {
    if (this.loginForm && this.loginForm.value) {
      let credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.loginSubscription = this.authService.loginHandler(credentials).subscribe(() => {
        this.infoSubscription = this.authService.infoHandler().subscribe(data => {
          const account = new Account(
            data.id,
            data.email,
            data.password,
            data.admin,
          );
          console.log(account.id, account.email, account.admin)
          this.accountService.setAccount(account);
          this.infoSubscription.unsubscribe();
          this.router.navigate(['/'])
          return this._snackBar.open("Succesfully logged in" , 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'right'
          });
        }, () => {
          return this._snackBar.open("Unable to login. Please try again", 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'right'
          });
        })
      })
    }
  }
}
