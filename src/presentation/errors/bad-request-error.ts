export class BadRequestError extends Error {
  constructor (private readonly error: string) {
    super(`Bad Request: ${error}`)
    this.name = 'Bad Request'
  }
}
