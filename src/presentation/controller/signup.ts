import { Controller } from './../protocols/controller'
import { Encrypter } from './../protocols/encrypter'
import { ok } from './../helpers/helpers-http'
import { IUserRepository } from './../../infra/db/interfaces/user-repository'
import { Validator } from './../protocols/validator'
import { badRequest, serverError } from '../helpers/helpers-http'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly repository: IUserRepository,
    private readonly encrypter: Encrypter
  ) {}

  async handle (req: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validator.validate(req.body)
      if (error) {
        return badRequest(error)
      }

      let newUser = { ...req.body, password: await this.encrypter.encrypt(req.body.password) }

      newUser = await this.repository.post(newUser)

      return ok(newUser)
    } catch (error) {
      return serverError(error)
    }
  }
}
