import { signUpFactory } from './../factories/controllers/signup'
import { adapterRouter } from './../adapters/adapterRoute'
import { Router } from 'express'

export default (route: Router): void => {
  route.post('/signup', adapterRouter(signUpFactory()))
}
