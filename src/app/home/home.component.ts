import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // alleProducten: Object;
  //
  //   constructor(private http: HttpClient) {
  //   }
  //
  //   loadProducts(): void {
  //     this.alleProducten.forEach((element, index) => {
  //       let article: HTMLElement = document.createElement("article");
  //       let cardImage: HTMLDivElement = document.createElement("div");
  //       let cardHeart: HTMLDivElement = document.createElement("div");
  //       let cardText: HTMLDivElement = document.createElement("div");
  //       let cardFooter: HTMLDivElement = document.createElement("div");
  //       let img: HTMLImageElement = document.createElement("img");
  //       let button: HTMLButtonElement = document.createElement("button");
  //
  //       article.classList.add("card");
  //       cardImage.classList.add("card-image");
  //       cardHeart.classList.add("heart");
  //       cardText.classList.add("card-text");
  //       cardFooter.classList.add("card-footer");
  //       button.classList.add("ripple");
  //
  //       let cardContainer: HTMLElement | null = document.getElementById("cards");
  //
  //       if (!cardContainer) {
  //         return;
  //       }
  //
  //       cardText.innerText = element.productNaam + " $" + element.productPrijs + "\n" + element.productDescription;
  //       button.innerText = "Order now!";
  //       img.src = element.img;
  //       cardImage.appendChild(cardHeart);
  //       cardImage.appendChild(img);
  //       article.appendChild(cardImage);
  //       article.appendChild(cardText);
  //       cardFooter.appendChild(button);
  //       article.appendChild(cardFooter);
  //
  //       cardContainer.appendChild(article);
  //     });
  //   }
  //
  //   loadJSON() {
  //     this.http.get('src/assets/main.json').subscribe(data => {
  //       this.alleProducten = data
  //     });
  //   }
  //
  //   ngOnInit() {
  //     this.loadJSON();
  //     this.loadProducts();
}
