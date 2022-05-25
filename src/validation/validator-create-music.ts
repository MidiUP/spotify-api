import { BadRequestError } from '../presentation/errors/bad-request-error'
import { Validator } from '../presentation/protocols/validator'
import * as yup from 'yup'

export class CreateMusicValidator implements Validator {
  private readonly schema = yup.object({
    name: yup.string().required('name is required'),
    album: yup.string().required('album is required'),
    artist: yup.string().required('artist is required'),
    thumb: yup.string().required('thumb is required')
  })

  async validate (input: any): Promise<Error> {
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
