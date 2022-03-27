import { BadRequestError } from './../presentation/errors/bad-request-error';
import { Validator } from './../presentation/protocols/validator';
import * as yup from 'yup'

export class CreateUserValidator implements Validator {

  private readonly schema = yup.object({
    name: yup.string().required('name is required'),
    email: yup.string().email('email invalid').required('email is required'),
    password: yup.string().required('password is required')
  })

  validate(input: any): Promise<Error> {

    return new Promise(resolve => {
      this.schema.validate(input)
        .then(res => {
          resolve(null)
          
        })
        .catch(err => {
          resolve(new BadRequestError(err.errors))
        })
    })
  }

}