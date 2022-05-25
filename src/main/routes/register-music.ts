import { registerMusicFactory } from './../factories/controllers/registerMusic'
import { adapterRouter } from '../adapters/adapterRoute'
import { Router } from 'express'

export default (route: Router): void => {
  route.post('/register-music' , adapterRouter(registerMusicFactory()))
}
