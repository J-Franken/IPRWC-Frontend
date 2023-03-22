import {Product} from "../model/product.model";

export interface OrderItem {
  product: Product;
  quantity: number;
}
