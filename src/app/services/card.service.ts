import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Card} from "../card/card.model";
import {AccountService} from "./account.service";
import {map} from "rxjs";
import {Product} from "../model/product.model";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: "root"
})

export class CardService {

  private cards: Card[] = [];

  constructor(private http: HttpClient, private accountService: AccountService) {
  }

//   getCardsAPI() {
//     let header = new HttpHeaders({"Authorization": "Bearer " + this.accountService.getJWT()});
//     return this.http.get(environment.apiKey + 'account/' + this.accountService.getAccount().id,
//       {
//         headers: header
//       }).pipe(map(car => {
//         for (let i = 0; i < car['payload'].length; i++) {
//           this.cards.push(new Product(car['payload'][i].id, car['payload'][i].name, car['payload'][i].description, car['payload'][i].price));
//         }
//         return this.cards;
//       }
//     ));
//   }
}
