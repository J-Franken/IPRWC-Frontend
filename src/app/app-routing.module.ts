import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CartComponent } from "./cart/cart.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import {AdminComponent} from "./admin/admin.component";
import { AdminGuard } from "./services/admin.guard";
import { AuthGuard } from "./services/auth.guard";
import { CouponComponent } from "./coupon/coupon.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'product', component: AdminComponent, canActivate: [AdminGuard, AuthGuard]},
  {path: 'coupon', component: CouponComponent, canActivate: [AdminGuard, AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
