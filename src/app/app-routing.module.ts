import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {CartComponent} from "./cart/cart.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import { AdminGuard } from "./services/admin.guard";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard, AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
