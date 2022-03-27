/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable @typescript-eslint/promise-function-async */
import { Encrypter } from './../../../presentation/protocols/encrypter'
import { IUserRepository } from '../../../infra/db/interfaces/user-repository'
import { ok, unprocessableEntity, badRequest, serverError } from './../../../presentation/helpers/helpers-http'
import { throwError } from '../../test-helpers/throw-error'
import { Validator } from '../../../presentation/protocols/validator'
import { MissingParamsError } from '../../../presentation/errors/missing-param-error'
import { HttpRequest } from '../../../presentation/protocols/http'
import { SignupController } from '../../../presentation/controller/signup'
import { CreateUser, UserDto } from '../../../domain/usecases/user'
import { UnprocessableEntity } from '../../../presentation/errors/unprocessable-entity-error'

interface sutTypes {
  sut: SignupController
  validation: Validator
  repository: IUserRepository
  encrypter: Encrypter
}

const makeValidator = (): Validator => {
  class Validation implements Validator {
    async validate (input: any): Promise<Error> {
      return null
    }
  }
  return new Validation()
}

const makeEncrypter = (): Encrypter => {
  class Encrypt implements Encrypter {
    compare (value: string, hash: string): Promise<boolean> {
      throw new Error('Method not implemented.')
    }
    encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hash'))
    }
  }
  return new Encrypt()
}

const makeRepository = (): IUserRepository => {
  const userStub = {
    id: 0,
    name: 'any_name',
    email: 'any_email'
  }
  const userStub2 = {
    id: 1,
    name: 'any_name',
    email: 'any_email'
  }
  const users = [userStub, userStub2]

  class UserRepository implements IUserRepository {
    getByEmail (email: string): Promise<UserDto> {
      return new Promise(resolve => resolve(null))
    }

    get (): Promise<UserDto[]> {
      return new Promise(resolve => resolve(users))
    }
    getById (id: number): Promise<UserDto> {
      return new Promise(resolve => resolve(userStub))
    }
    post (user: CreateUser): Promise<UserDto> {
      return new Promise(resolve => resolve(userStub))
    }
    put (id: number): void { }
    delete (id: number): void { }
  }
  return new UserRepository()
}

const makeSut = (): sutTypes => {
  const validation = makeValidator()
  const repository = makeRepository()
  const encrypter = makeEncrypter()
  const sut = new SignupController(validation, repository, encrypter)
  return {
    sut,
    validation,
    repository,
    encrypter
  }
}

const request: HttpRequest = {
  header: {},
  body: {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  }
}

describe('signup controller', () => {
  test('shold call validate with correct param', async () => {
    const { sut, validation } = makeSut()
    const spyValidation = jest.spyOn(validation, 'validate').mockReturnValueOnce(new Promise(resolve => resolve(new MissingParamsError('email'))))
    await sut.handle(request)
    expect(spyValidation).toHaveBeenCalledWith(request.body)
  })

  test('shold return 400 and error returned for validate', async () => {
    const { sut, validation } = makeSut()
    jest.spyOn(validation, 'validate').mockReturnValueOnce(new Promise(resolve => resolve(new MissingParamsError('email'))))
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new MissingParamsError('email')))
  })

  test('shold return 500 if validate throw error', async () => {
    const { sut, validation } = makeSut()
    jest.spyOn(validation, 'validate').mockImplementationOnce(throwError)
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('shold return 500 if repository throw error', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'post').mockImplementationOnce(throwError)
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('shold return 500 if encrypter throw error', async () => {
    const { sut, encrypter } = makeSut()
    jest.spyOn(encrypter, 'encrypt').mockImplementationOnce(throwError)
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('shold call encrypt with correct param', async () => {
    const { sut, encrypter } = makeSut()
    const spyValidation = jest.spyOn(encrypter, 'encrypt')
    await sut.handle(request)
    expect(spyValidation).toHaveBeenCalledWith(request.body.password)
  })

  test('shold call getUser with correct param', async () => {
    const { sut, repository } = makeSut()
    const spyGetByEmail = jest.spyOn(repository, 'getByEmail')
    await sut.handle(request)
    expect(spyGetByEmail).toHaveBeenCalledWith(request.body.email)
  })

  test('shold return 422 if email was cadastred', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'getByEmail').mockImplementationOnce(() => new Promise(resolve => resolve({ id: 0, email: 'any_email', name: 'name' })))
    const reponse = await sut.handle(request)
    expect(reponse).toEqual(unprocessableEntity(new UnprocessableEntity('email is already registered')))
  })

  test('shold return 200 user created', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(request)
    expect(response).toEqual(ok({
      id: 0,
      name: 'any_name',
      email: 'any_email'
    }))
  })
})
