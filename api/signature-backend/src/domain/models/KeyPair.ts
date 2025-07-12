export class KeyPair {
  constructor(
    public alias: string,
    public publicKey: string,
    public id?: number
  ) {}
}
