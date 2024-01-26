export class Order {

  public id: number;
  public order_id: String;

  constructor(id: number, order_id: String) {
    this.id = id;
    this.order_id = order_id;
  }
}
