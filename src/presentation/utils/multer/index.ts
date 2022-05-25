import { configMulter } from './config'
import multer from 'multer'

export const uploadMusic = multer(configMulter).single('music')
