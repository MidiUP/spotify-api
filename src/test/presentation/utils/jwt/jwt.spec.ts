import { Jwt } from './../../../../presentation/utils/jwt/jwt'
import { ManagerToken } from './../../../../presentation/protocols'

interface sutTypes {
  sut: ManagerToken
  secondSut: ManagerToken
}

const makeSut = (): sutTypes => {
  const sut = new Jwt(secretKey)
  const secondSut = new Jwt(secondSecretKey)
  return {
    sut,
    secondSut
  }
}

const secretKey = 'any_key'
const secondSecretKey = 'any_key_two'

const dataToken = {
  id: 0
}

describe('jwt tests', () => {
  test('shold token', async () => {
    const { sut } = makeSut()
    const result = await sut.generateToken(dataToken)
    expect(typeof (result)).toBe('string')
  })

  test('shold true in validate token for genereted token', async () => {
    const { sut } = makeSut()
    const token = await sut.generateToken(dataToken)
    const result = await sut.validateToken(token)
    expect(result).toBe(true)
  })

  test('shold false in invalid token was seted', async () => {
    const { sut } = makeSut()
    const invalidToken = 'invalidToken'
    const result = await sut.validateToken(invalidToken)
    expect(result).toBe(false)
  })

  test('shold false in validate token genereted for other secret key', async () => {
    const { sut, secondSut } = makeSut()
    const otherToken = await secondSut.generateToken(dataToken)
    const result = await sut.validateToken(otherToken)
    expect(result).toBe(false)
  })
})
