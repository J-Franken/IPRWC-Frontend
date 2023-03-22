import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";
import {OrderItem} from "../interfaces/orderItem.interface";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
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
  }

  getItems() {
    return this.items;
  }

  increaseQuantity(item: OrderItem) {
    item.quantity++;
  }

  decreaseQuantity(item: OrderItem) {
    item.quantity--;
    if (item.quantity === 0) {
      const index = this.items.indexOf(item);
      this.items.splice(index, 1);
    }
  }
  clearCart() {
    this.items = [];
    return this.items;
  }

  private cartSubject = new BehaviorSubject<OrderItem[]>(this.getCartItemsFromLocalStorage());
  public cart$ = this.cartSubject.asObservable();

  private getCartItemsFromLocalStorage(): OrderItem[] {
    const cartItemsJson = localStorage.getItem('cartItems');
    return cartItemsJson ? JSON.parse(cartItemsJson) : [];
  }

  private saveCartItemsToLocalStorage(cartItems: OrderItem[]): void {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  public updateCartItemQuantity(orderItem: OrderItem): void {
    const cartItems = this.getCartItemsFromLocalStorage();
    const existingOrderItem = cartItems.find(item => item.product.id === orderItem.product.id);
    if (existingOrderItem) {
      existingOrderItem.quantity = orderItem.quantity;
    } else {
      cartItems.push(orderItem);
    }
    this.saveCartItemsToLocalStorage(cartItems);
    this.cartSubject.next(cartItems);
  }

  public removeCartItem(orderItem: OrderItem): void {
    const cartItems = this.getCartItemsFromLocalStorage();
    const index = cartItems.findIndex(item => item.product.id === orderItem.product.id);
    if (index !== -1) {
      cartItems.splice(index, 1);
      this.saveCartItemsToLocalStorage(cartItems);
      this.cartSubject.next(cartItems);
    }
  }
}
