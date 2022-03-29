import { loginFactory } from './../factories/controllers/login'
import { adapterRouter } from '../adapters/adapterRoute'
import { Router } from 'express'

export default (route: Router): void => {
  route.post('/login', adapterRouter(loginFactory()))
}
