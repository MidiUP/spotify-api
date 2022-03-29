/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable @typescript-eslint/promise-function-async */
import { BadRequestError } from './../../../presentation/errors/bad-request-error'
import { ManagerToken } from './../../../presentation/protocols/manager-token'
import { LoginController } from './../../../presentation/controller/login'
import { Encrypter, Validator, HttpRequest } from './../../../presentation/protocols'
import { IUserRepository } from '../../../infra/db/interfaces/user-repository'
import { badRequest, serverError, ok } from './../../../presentation/helpers/helpers-http'
import { throwError } from '../../test-helpers/throw-error'
import { MissingParamsError } from '../../../presentation/errors/missing-param-error'
import { CreateUser, UserDto, UserLogin } from '../../../domain/usecases/user'

interface sutTypes {
  sut: LoginController
  validation: Validator
  repository: IUserRepository
  encrypter: Encrypter
  managerToken: ManagerToken
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
      return new Promise(resolve => resolve(true))
    }
    encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hash'))
    }
  }
  return new Encrypt()
}

const makeManagerToken = (): ManagerToken => {
  class ManagerTokenStub implements ManagerToken {
    generateToken (data: Object): Promise<string> {
      return new Promise(resolve => resolve('token'))
    }

    validateToken (token: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new ManagerTokenStub()
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
    login (email: string): Promise<UserLogin> {
      const loginUserData = {
        email: 'any_email',
        password: 'any_password',
        id: 0
      }
      return new Promise(resolve => resolve(loginUserData))
    }
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
  const managerToken = makeManagerToken()
  const sut = new LoginController(validation, repository, encrypter, managerToken)
  return {
    sut,
    validation,
    repository,
    encrypter,
    managerToken
  }
}

const request: HttpRequest = {
  header: {},
  body: {
    email: 'any_email',
    password: 'any_password'
  }
}

describe('login controller', () => {
  test('shold call validate with correct param', async () => {
    const { sut, validation } = makeSut()
    const spyValidation = jest.spyOn(validation, 'validate').mockReturnValueOnce(new Promise(resolve => resolve(new MissingParamsError('email'))))
    await sut.handle(request)
    expect(spyValidation).toHaveBeenCalledWith(request.body)
  })

  test('shold return 400 and error returned for validate return error', async () => {
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

  test('shold return 500 if repository find login throw error', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'login').mockImplementationOnce(throwError)
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('shold return 500 if encrypter throw error', async () => {
    const { sut, encrypter } = makeSut()
    jest.spyOn(encrypter, 'compare').mockImplementationOnce(throwError)
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('shold call encrypt compare with correct param', async () => {
    const { sut, encrypter } = makeSut()
    const spyValidation = jest.spyOn(encrypter, 'compare')
    const mockPassword = 'any_password'
    await sut.handle(request)
    expect(spyValidation).toHaveBeenCalledWith(request.body.password, mockPassword)
  })

  test('shold return 400 if compare return false', async () => {
    const { sut, encrypter } = makeSut()
    jest.spyOn(encrypter, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new BadRequestError('password invalid')))
  })

  test('shold call login with correct param', async () => {
    const { sut, repository } = makeSut()
    const spyLogin = jest.spyOn(repository, 'login')
    await sut.handle(request)
    expect(spyLogin).toHaveBeenCalledWith(request.body.email)
  })

  test('shold bad request if user not registered', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'login').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new BadRequestError('email is not registered')))
  })

  test('shold call generateToken with correct param', async () => {
    const { sut, managerToken } = makeSut()
    const spyLogin = jest.spyOn(managerToken, 'generateToken')
    await sut.handle(request)
    expect(spyLogin).toHaveBeenCalledWith({ id: 0 })
  })

  test('shold return 500 if managerToken throw error', async () => {
    const { sut, managerToken } = makeSut()
    jest.spyOn(managerToken, 'generateToken').mockImplementationOnce(throwError)
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('shold return 200 if nothing error to occur', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(request)
    expect(response).toEqual(ok({ token: 'token' }))
  })
})
