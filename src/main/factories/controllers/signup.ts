import { Bcrypt } from './../../../presentation/utils/bcrypt/bcrypt'
import { UserRepository } from './../../../infra/db/mySql/user-repository'
import { CreateUserValidator } from './../../../validation/validator-create-user'
import { SignupController } from './../../../presentation/controller/signup'

export const signUpFactory = (): SignupController => {
  const validator = new CreateUserValidator()
  const repository = new UserRepository()
  const bcrypt = new Bcrypt(12)
  return new SignupController(validator, repository, bcrypt)
}
