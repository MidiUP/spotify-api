import path from 'path'
import multer from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'infra', 'tmp')

export const configMulter = {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename (request, file, callback) {
      const fileName = file.originalname
      request.body.fileName = fileName
      return callback(null, fileName)
    }
  })
}
