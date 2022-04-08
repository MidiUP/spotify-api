import { serverError, ok } from './../../../presentation/helpers/helpers-http'
import { throwError } from './../../test-helpers/throw-error'
import { HttpRequest } from './../../../presentation/protocols/http'
import { AwsS3 } from './../../../presentation/protocols/S3'
import { AwsUploadMusicController } from './../../../presentation/controller/AwsUploadMusic'

const req: HttpRequest = {
  header: {},
  body: {
    fileName: 'any_name'
  }
}

interface SutTypes {
  sut: AwsUploadMusicController
  s3Bucket: AwsS3
}

const makeS3Bucket = (): AwsS3 => {
  class S3BucketStub implements AwsS3 {
    async saveFile (filename: string): Promise<string> {
      return new Promise(resolve => resolve('path'))
    }
  }
  return new S3BucketStub()
}

const makeSut = (): SutTypes => {
  const s3Bucket = makeS3Bucket()
  const sut = new AwsUploadMusicController(s3Bucket)
  return {
    sut,
    s3Bucket
  }
}

describe('AwsUploadMusic', () => {
  test('shold call saveFile with correct params', async () => {
    const { sut, s3Bucket } = makeSut()
    const spyS3Bucket = jest.spyOn(s3Bucket, 'saveFile')
    await sut.handle(req)
    expect(spyS3Bucket).toHaveBeenCalledWith('any_name')
  })

  test('shold return 500 if saveFile throw error', async () => {
    const { sut, s3Bucket } = makeSut()
    jest.spyOn(s3Bucket, 'saveFile').mockReturnValueOnce(throwError())
    const response = await sut.handle(req)
    expect(response).toEqual(serverError(new Error()))
  })

  test('shold return 200 if all right', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(req)
    expect(response).toEqual(ok({ path: 'path' }))
  })
})
