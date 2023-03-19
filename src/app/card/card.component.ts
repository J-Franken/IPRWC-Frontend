import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product.model";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  cards: Product[] = [];

  constructor() { }

  ngOnInit(): void {
    // load the cards from a service or API
    this.loadCards();
  }

  loadCards(): void {
    // simulate loading the cards from an API
    setTimeout(() => {
      this.cards = [
        { id: 1, name: 'Product 1', description: 'Description for product 1', price: 9.99 },
        { id: 2, name: 'Product 2', description: 'Description for product 2', price: 19.99 },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 29.99 },
        { id: 4, name: 'Product 4', description: 'Description for product 4', price: 39.99 },
      ];
    }, 10); // simulate a delay of 2 seconds
  }
}
