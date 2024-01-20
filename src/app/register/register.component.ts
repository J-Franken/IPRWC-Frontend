import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AccountService} from "../services/account.service";
import {AuthService} from "../services/auth.service";
import {Account} from "../model/account.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {v4 as uuidv4} from "uuid";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  authSub!: Subscription;
  registrationForm!: FormGroup;

  constructor(private router: Router, private accountService: AccountService, private authService: AuthService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    if (this.registrationForm && this.registrationForm.value) {
      const account = new Account(
        Number(uuidv4()),
        this.registrationForm.value.email,
        this.registrationForm.value.password,
        false
      );
      this.authSub = this.authService.registerHandler(account).subscribe(() => {
        this.authSub.unsubscribe();
        this.router.navigate(['/login'])
        return this._snackBar.open('Registering successful!', 'Dismiss', {
          duration: 3000,
          horizontalPosition: 'right'
        });
      }, () => {
          return this._snackBar.open("Unable to create account. Please try again", 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'right'
          });
      })
    }
  }
}




