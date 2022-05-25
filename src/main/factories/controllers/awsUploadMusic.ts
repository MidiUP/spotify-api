import { AwsS3 } from './../../../presentation/protocols/S3'
import { S3Bucket } from '../../../presentation/utils/aws/s3-bucket'
import { AwsUploadMusicController } from '../../../presentation/controller/AwsUploadMusic'

export const Awsfactory = (): AwsUploadMusicController => {
  const s3Bucket: AwsS3 = new S3Bucket()
  return new AwsUploadMusicController(s3Bucket)
}
