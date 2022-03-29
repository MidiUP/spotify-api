import { UnprocessableEntity } from './../errors/unprocessable-entity-error'
import { Controller, Encrypter, Validator, HttpRequest, HttpResponse } from './../protocols'
import { ok, unprocessableEntity } from './../helpers/helpers-http'
import { IUserRepository } from './../../infra/db/interfaces/user-repository'
import { badRequest, serverError } from '../helpers/helpers-http'

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

      const checkEmail = await this.repository.getByEmail(req.body.email)
      if (checkEmail) {
        return unprocessableEntity(new UnprocessableEntity('email is already registered'))
      }

      let newUser = { ...req.body, password: await this.encrypter.encrypt(req.body.password) }

      newUser = await this.repository.post(newUser)

      return ok(newUser)
    } catch (error) {
      return serverError(error)
    }
  }
}
