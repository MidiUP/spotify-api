import { ok } from './../helpers/helpers-http';
import { IUserRepository } from './../../infra/db/interfaces/user-repository';
import { Validator } from './../protocols/validator';
import { MissingParamsError } from "../errors/missing-param-error";
import { badRequest, serverError } from "../helpers/helpers-http";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignupController {

  constructor(
    private readonly validator: Validator,
    private readonly repository: IUserRepository
  ){}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    try{
      const error = await this.validator.validate(req.body)
      if(error){
        return badRequest(error)
      }

      const user = await this.repository.post(req.body)

      return ok(user)

    }catch(error){
      return serverError(error)
    }
  }

}