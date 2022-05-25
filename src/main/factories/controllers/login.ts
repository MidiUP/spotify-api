import { Jwt } from './../../../presentation/utils/jwt/jwt'
import { Bcrypt } from './../../../presentation/utils/bcrypt/bcrypt'
import { UserRepository } from './../../../infra/db/mySql/user-repository'
import { LoginUserValidator } from './../../../validation/validator-login-user'
import { LoginController } from './../../../presentation/controller/login'
import 'dotenv/config'

export const loginFactory = (): LoginController => {
  const validator = new LoginUserValidator()
  const repository = new UserRepository()
  const encrypter = new Bcrypt(12)
  const managerToken = new Jwt(process.env.JWT_PRIVATE_KEY)
  return new LoginController(validator, repository, encrypter, managerToken)
}
