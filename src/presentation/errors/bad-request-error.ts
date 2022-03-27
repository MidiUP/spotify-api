export class BadRequestError extends Error{
  constructor(private error: string){
    super(`Bad Request: ${error}`)
    this.name = 'Bad Request'
  }
}