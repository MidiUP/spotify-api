export interface AwsS3{
  saveFile: (filename: string) => Promise<string>
}
