export class MissingParamsError extends Error {
  constructor(paramMissing: string) {
    super(`missing param: ${paramMissing}`)
    this.name = 'MissingParamsError'
  }
} 
