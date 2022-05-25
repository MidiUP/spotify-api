import { throwError } from './../../test-helpers/throw-error'
import { IMusicRepository } from './../../../infra/db/interfaces/music-repository'
import { HttpRequest } from '../../../presentation/protocols/http'
import { MissingParamsError } from '../../../presentation/errors/missing-param-error'
import { Validator } from '../../../presentation/protocols/validator'
import { RegisterMusicController } from '../../../presentation/controller/registerMusic'
import { CreateMusic, MusicDto } from '../../../domain/usecases/music'
import { ok, serverError } from '../../../presentation/helpers/helpers-http'

interface sutTypes {
  sut: RegisterMusicController
  validator: Validator
  repository: IMusicRepository
}

const makeValidator = (): Validator => {
  class Validation implements Validator {
    async validate (input: any): Promise<Error> {
      return null
    }
  }
  return new Validation()
}

const makeRepository = (): IMusicRepository => {
  class MusicRepository implements IMusicRepository {
    async post (music: CreateMusic): Promise<MusicDto> {
      return {
        album: 'any_album',
        id: 0,
        name: 'any_name',
        artist: 'any_artist',
        thumb: 'any_thumb'
      }
    }
  }
  return new MusicRepository()
}

const makeSut = (): sutTypes => {
  const validator = makeValidator()
  const repository = makeRepository()
  const sut = new RegisterMusicController(validator, repository)
  return {
    sut,
    validator,
    repository
  }
}

const request: HttpRequest = {
  header: {},
  body: {
    name: 'any_name',
    album: 'any_album',
    artist: 'any_artist',
    thumb: 'any_thumb'
  }
}

describe('RegisterMusic', () => {
  test('validation shold be called with correct params', async () => {
    const { validator, sut } = makeSut()
    const spyValidation = jest.spyOn(validator, 'validate')
    await sut.handle(request)
    expect(spyValidation).toBeCalledWith(request.body)
  })

  test('shold return badRequest if validation returns error', async () => {
    const { validator, sut } = makeSut()
    jest.spyOn(validator, 'validate').mockReturnValueOnce(new Promise(resolve => resolve(new MissingParamsError('email'))))
    const response = await sut.handle(request)
    expect(response.body).toEqual(new MissingParamsError('email'))
  })

  test('repository post shold be called with correct params', async () => {
    const { repository, sut } = makeSut()
    const spyRepository = jest.spyOn(repository, 'post')
    await sut.handle(request)
    expect(spyRepository).toBeCalledWith(request.body)
  })

  test('shold returns server error if repository return error', async () => {
    const { repository, sut } = makeSut()
    jest.spyOn(repository, 'post').mockImplementationOnce(throwError)
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('shold new music if all correct', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(request)
    const responseExpected = {
      album: 'any_album',
      id: 0,
      name: 'any_name',
      artist: 'any_artist',
      thumb: 'any_thumb'
    }
    expect(response).toEqual(ok(responseExpected))
  })
})
