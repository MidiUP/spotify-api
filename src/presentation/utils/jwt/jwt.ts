import { ManagerToken } from './../../protocols/manager-token'
import * as jwt from 'jsonwebtoken'

export class Jwt implements ManagerToken {
  constructor (
    private readonly key: string
  ) {}

  async generateToken (data: Object): Promise<string> {
    return new Promise(resolve => resolve(jwt.sign(data, this.key)))
  }

  async validateToken (token: string): Promise<boolean> {
    try {
      jwt.verify(token, this.key)
      return true
    } catch (err) {
      return false
    }
  }
}
