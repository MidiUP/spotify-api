import { Bcrypt } from './../../../../presentation/utils/bcrypt/bcrypt'
import { Encrypter } from './../../../../presentation/protocols/encrypter'

interface sutTypes {
  sut: Encrypter
}

const makeSut = (): sutTypes => {
  const sut = new Bcrypt(12)
  return {
    sut
  }
}

describe('bcrypt tests', () => {
  test('shold hash', async () => {
    const { sut } = makeSut()
    const result = await sut.encrypt('any_string')
    expect(typeof (result)).toBe('string')
  })

  test('shold true in comparation between string and hash generated', async () => {
    const { sut } = makeSut()
    const string = 'any_string'
    const hash = await sut.encrypt('any_string')
    const result = await sut.compare(string, hash)
    expect(result).toBe(true)
  })

  test('shold false in comparation between false string and hash generated', async () => {
    const { sut } = makeSut()
    const string = 'any_string'
    const stringFalse = 'stringFalse_string'
    const hash = await sut.encrypt(string)
    const result = await sut.compare(stringFalse, hash)
    expect(result).toBe(false)
  })
})
