import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderModule } from '../header/header.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }