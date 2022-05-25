import { AwsS3 } from '../../protocols/S3'
import aws, { S3 } from 'aws-sdk'
import path from 'path'
import mime from 'mime'
import fs from 'fs'

export class S3Bucket implements AwsS3 {
  private readonly client: S3
  private readonly basePath: string

  constructor () {
    this.client = new aws.S3({
      region: 'sa-east-1'
    })
    this.basePath = path.resolve(__dirname, '..', '..', '..', 'infra', 'tmp')
  }

  async saveFile (filename: string): Promise<string> {
    const pathFile = `${this.basePath}/${filename}`
    const contentType = mime.getType(pathFile)

    if (!contentType) {
      throw new Error('File not found')
    }

    const file = await fs.promises.readFile(pathFile)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    const data = this.client
      .upload({
        Bucket: 'node-spotify-api',
        Key: filename,
        Body: file,
        ContentType: contentType
      }).promise()

    return (await data).Location
  }
}
