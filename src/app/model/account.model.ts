export class Account {

  public id: number;
  public full_name: string;
  public email: string;
  public password: string;
  public admin: boolean;


  constructor(id: number, full_name: string, email: string, password: string, admin: boolean) {
    this.id = id;
    this.full_name = full_name;
    this.email = email;
    this.password = password;
    this.admin = admin;
  }
}
