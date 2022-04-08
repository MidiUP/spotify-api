import { ok, serverError } from '../helpers/helpers-http'
import { AwsS3 } from '../protocols/S3'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'

export class AwsUploadMusicController implements Controller {
  constructor (
    private readonly s3Bucket: AwsS3
  ) {}

  async handle (req: HttpRequest): Promise<HttpResponse> {
    try {
      const { fileName } = req.body
      const path = await this.s3Bucket.saveFile(fileName)
      return ok({ path: path })
    } catch (error) {
      return serverError(error)
    }
  }
}
