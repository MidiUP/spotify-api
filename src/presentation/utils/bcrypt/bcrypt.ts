import { Encrypter } from './../../protocols/encrypter'
import * as bcrypt from 'bcrypt'

export class Bcrypt implements Encrypter {
  constructor (
    private readonly salts: number
  ) {}

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }

  async encrypt (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salts)
  }
}
