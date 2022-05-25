import { LoginUserValidator } from './../../validation/validator-login-user'
import { BadRequestError } from '../../presentation/errors/bad-request-error'
import { Validator } from '../../presentation/protocols/validator'

interface sutTypes{
  sut: Validator
}

const makeSut = (): sutTypes => {
  const sut = new LoginUserValidator()
  return {
    sut
  }
}

describe('validator login user tests', () => {
  test('shold error if email invalid', async () => {
    const { sut } = makeSut()
    const req = {
      email: 'email_invalid',
      password: 'any_password'
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new BadRequestError('email invalid'))
  })

  test('shold error if email empty', async () => {
    const { sut } = makeSut()
    const req = {
      password: 'any_password'
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new BadRequestError('email is required'))
  })

  test('shold error if password empty', async () => {
    const { sut } = makeSut()
    const req = {
      email: 'any_email@mail.com'
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new BadRequestError('password is required'))
  })

  test('shold null if object accept', async () => {
    const { sut } = makeSut()
    const req = {
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const result = await sut.validate(req)
    expect(result).toEqual(null)
  })
})
