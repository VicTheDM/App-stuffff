export class User {
  public userId = '';
  public username?: string;
  public password?: string;
  public firstName  = '';
  public lastName  = '';
  public userType  = '';

  public accessToken? : {
    token: string,
    expiresIn:number
  };

}
