import { Component, OnInit } from '@angular/core';
import {CartService} from "../services/cart.service";
import {OrderItem} from "../interfaces/orderItem.interface";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: OrderItem[] = [];

  constructor(private cartService: CartService) { }

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
}
