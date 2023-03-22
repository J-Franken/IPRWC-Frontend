import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../model/product.model";
import {ProductService} from "../services/product.service";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  products: Product[] = [];
  @Input() product!: Product;

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.loadCards();
  }

  loadCards() {
    this.productService.getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
      });
  }

  addToCart(product: Product){
    this.cartService.addToCart(product)
    console.log(`Product ${product.id} has been added to the cart`);
  }
}
