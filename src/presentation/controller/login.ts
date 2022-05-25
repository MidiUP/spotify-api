import { BadRequestError } from './../errors/bad-request-error'
import { ManagerToken, Controller, Encrypter, Validator, HttpRequest, HttpResponse } from './../protocols'
import { IUserRepository } from './../../infra/db/interfaces/user-repository'
import { badRequest, serverError, ok } from '../helpers/helpers-http'

export class LoginController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly repository: IUserRepository,
    private readonly encrypter: Encrypter,
    private readonly managerToken: ManagerToken
  ) { }

  async handle (req: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validator.validate(req.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = req.body

      const user = await this.repository.login(email)

      if (!user) {
        return badRequest(new BadRequestError('email is not registered'))
      }

      const isPasswordValid = await this.encrypter.compare(password, user.password)

      if (!isPasswordValid) {
        return badRequest(new BadRequestError('password invalid'))
      }

      const token = await this.managerToken.generateToken({ id: user.id })

      return ok({ token })
    } catch (error) {
      return serverError(error)
    }
  }
}
