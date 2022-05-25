import supertest from 'supertest'
import { setupApp } from '../../../main/config/app'
import { deleteUsersTests } from '../../test-helpers/delete-user-tests'

const app = setupApp()

describe('tests integration of login', () => {
  beforeEach(async () => {
    await deleteUsersTests()
  })

  afterAll(async () => {
    await deleteUsersTests()
  })

  test('shold return 400 if email is empty', async () => {
    const request = {
      password: 'any_password'
    }
    await supertest(app)
      .post('/api/login')
      .send(request)
      .expect(400)
  })

  test('shold return 400 if password is empty', async () => {
    const request = {
      email: 'email_valid@mail.com'
    }
    await supertest(app)
      .post('/api/login')
      .send(request)
      .expect(400)
  })

  test('shold return 400 if email is invalid', async () => {
    const request = {
      email: 'email_invalid',
      password: 'any_password'
    }
    await supertest(app)
      .post('/api/login')
      .send(request)
      .expect(400)
  })
})
