import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";
import {OrderItem} from "../interfaces/orderItem.interface";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';

  constructor() {
    const cart = localStorage.getItem(this.cartKey);
    if (cart) {
      this.items = JSON.parse(cart);
    }
  }
  items: OrderItem[] = []

  addToCart(product: Product) {
    let addedToExistingItem = false;
    for (let item of this.items) {
      if (item.product.id === product.id) {
        item.quantity++;
        addedToExistingItem = true;
        break;
      }
    }
    if (!addedToExistingItem) {
      this.items.push({ product: product, quantity: 1 });
    }
    this.saveCart();
  }

  getItems() {
    return this.items;
  }

  increaseQuantity(item: OrderItem) {
    item.quantity++;
    this.saveCart();
  }

  decreaseQuantity(item: OrderItem) {
    item.quantity--;
    if (item.quantity === 0) {
      const index = this.items.indexOf(item);
      this.items.splice(index, 1);
    }
    this.saveCart();
  }
  clearCart() {
    this.items = [];
    this.saveCart();
    return this.items;
  }

  private saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));
  }
}
