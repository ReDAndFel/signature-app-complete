export class KeyPair {
  constructor(
    public alias: string,
    public publicKey: string,
    public userId: number,
    public id?: number
  ) {}
}
