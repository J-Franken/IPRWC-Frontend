import { Component, OnInit } from '@angular/core';
import {CartService} from "../services/cart.service";
import {OrderItem} from "../interfaces/orderItem.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AccountService} from "../services/account.service";
import {Order} from "../model/order.model";
import {v4 as uuidv4} from "uuid";
import {OrderService} from "../services/order.service";
import {CouponService} from "../services/coupon.service";
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: OrderItem[] = [];

  constructor(private http: HttpClient, private cartService: CartService, private _snackbar: MatSnackBar, private accountService: AccountService, private orderService: OrderService, private couponService: CouponService) {
  }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  increaseQuantity(item: OrderItem) {
    this.cartService.increaseQuantity(item);
  }

  decreaseQuantity(item: OrderItem) {
    this.cartService.decreaseQuantity(item);
  }

  removeItem(item: OrderItem) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  clearCart() {
    this.cartService.clearCart();
    this.items = [];
  }

  getTotal() {
    let total = 0;
    for (let item of this.items) {
      total += item.quantity * item.product.price;
    }
    return total;
  }

  createOrder() {
    if (this.items == null || this.items.length === 0) {
      return this._snackbar.open("No items in the cart", 'Dismiss', {
        duration: 3000,
        horizontalPosition: 'right'
      });
    } else if (!this.accountService.getAccount()) {
      return this._snackbar.open("You aren't logged in!", 'Dismiss', {
        duration: 3000,
        horizontalPosition: 'right'
      });
    } else {
      const order = new Order(
        Number(uuidv4()),
        uuidv4()
      );
    
      this.http.post(`${environment.apiKey}orders`, order).subscribe(
        (response: any) => {
          this._snackbar.open('Order created successfully', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'right'
          });
          this.clearCart();
        },
        (error) => {
          console.error('Failed to create order:', error);
          this._snackbar.open('Failed to create the order. Please try again later.', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'right'
          });
        }
      );
    } return null;
  }
}
