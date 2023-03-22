export class Account {

  public id: number;
  public email: string;
  public password: string;
  public admin: boolean;


  constructor(id: number, email: string, password: string, admin: boolean) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.admin = admin;
  }
}
