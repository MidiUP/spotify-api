import { IMusicRepository } from './../../infra/db/interfaces/music-repository'
import { HttpRequest } from './../protocols/http'
import { badRequest, ok, serverError } from './../helpers/helpers-http'
import { Validator } from './../protocols/validator'
import { Controller } from './../protocols/controller'
import { HttpResponse } from '../protocols'

export class RegisterMusicController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly repository: IMusicRepository
  ) { }

  async handle (req: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = req

      const error = await this.validator.validate(body)

      if (error) {
        return badRequest(error)
      }

      const newMusic = await this.repository.post(body)

      return ok(newMusic)
    } catch (err) {
      return serverError(err)
    }
  }
}
