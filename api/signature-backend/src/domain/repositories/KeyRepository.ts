import { KeyPair } from "../models/KeyPair";

export interface KeyRepository {
  saveKey(keyPair: KeyPair): Promise<void>;
  getPublicKey(alias: string): Promise<KeyPair | null>;
  getPuyblicKeyByUserId(userId: number): Promise<KeyPair | null>;
}
