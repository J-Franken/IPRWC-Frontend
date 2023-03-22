import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../model/product.model";
import {ProductService} from "../services/product.service";
import {CartService} from "../services/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  products: Product[] = [];
  @Input() product!: Product;

  constructor(private productService: ProductService, private cartService: CartService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadCards();
  }

  loadCards() {
    this.productService.getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product)
    const message = `${product.name} has been added to the cart`;
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}
