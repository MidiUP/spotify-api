import path from 'path'
import multer from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'infra', 'tmp')

export const configMulter = {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename (request, file, callback) {
      const filename = file.originalname
      request.body.filename = filename
      return callback(null, filename)
    }
  })
}
