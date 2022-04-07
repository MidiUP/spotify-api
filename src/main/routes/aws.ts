import { adapterRouter } from './../adapters/adapterRoute'
import { Router } from 'express'
import { Awsfactory } from '../factories/controllers/AwsController'
import { uploadMusic } from '../../presentation/utils/multer'

export default (route: Router): void => {
  route.post('/aws', uploadMusic , adapterRouter(Awsfactory()))
}
