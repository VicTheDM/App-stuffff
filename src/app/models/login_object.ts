interface LoginObj{
  username: string;
  password: string;
  remember: number;
}
export class LoginObject {
  public username: string;
  public password: string;
  public remember: number;

  constructor( object: LoginObj){
    this.username = (object.username) ? object.username : null;
    this.password = (object.password) ? object.password : null;
    this.remember = (object.remember) ? object.remember : null;
  }
  
}
