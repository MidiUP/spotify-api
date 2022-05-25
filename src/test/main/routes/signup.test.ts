import supertest from 'supertest'
import { setupApp } from '../../../main/config/app'
import { deleteUsersTests } from '../../test-helpers/delete-user-tests'

const app = setupApp()

describe('tests integration of signup', () => {
  beforeEach(async () => {
    await deleteUsersTests()
  })

  afterAll(async () => {
    await deleteUsersTests()
  })

  test('shold return 400 if name is empty', async () => {
    const request = {
      email: 'email_valid@mail.com',
      password: 'any_password'
    }
    await supertest(app)
      .post('/api/signup')
      .send(request)
      .expect(400)
  })

  test('shold return 400 if password is empty', async () => {
    const request = {
      email: 'email_valid@mail.com',
      name: 'any_email'
    }
    await supertest(app)
      .post('/api/signup')
      .send(request)
      .expect(400)
  })

  test('shold return 400 if email is empty', async () => {
    const request = {
      password: 'any_password',
      name: 'any_email'
    }
    await supertest(app)
      .post('/api/signup')
      .send(request)
      .expect(400)
  })

  test('shold return 400 if email is invalid', async () => {
    const request = {
      email: 'email_invalid',
      password: 'any_password',
      name: 'any_name'
    }
    await supertest(app)
      .post('/api/signup')
      .send(request)
      .expect(400)
  })

  test('shold return 200 if req is valid', async () => {
    const request = {
      email: 'email@valid.com',
      password: 'any_password',
      name: 'any_name'
    }
    await supertest(app)
      .post('/api/signup')
      .send(request)
      .expect(200)
  })

  test('shold return 422 if email already registerd', async () => {
    const request = {
      email: 'email@valid.com',
      password: 'any_password',
      name: 'any_name'
    }
    await supertest(app)
      .post('/api/signup')
      .send(request)

    await supertest(app)
      .post('/api/signup')
      .send(request)
      .expect(422)
  })
})
