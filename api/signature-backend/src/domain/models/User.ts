export class User {
  constructor(public name: string, public email: string, public id?: number) {}
}

export class OAuthUser extends User {
  constructor(
    name: string,
    email: string,
    public oauthProvider: string,
    public oauthId: string,
    public avatarUrl: string,
    id?: number
  ) {
    super(name, email, id);
  }
}
