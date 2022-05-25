import { UnprocessableEntity } from './../errors/unprocessable-entity-error'
import { HttpResponse } from './../protocols/http'

export const badRequest = (error: Error): HttpResponse => {
  return ({
    statusCode: 400,
    body: error
  })
}

export const unprocessableEntity = (error: UnprocessableEntity): HttpResponse => {
  return ({
    statusCode: 422,
    body: error
  })
}

export const ok = (body: any): HttpResponse => {
  return ({
    statusCode: 200,
    body
  })
}

export const noContent = (): HttpResponse => {
  return ({
    statusCode: 204,
    body: {}
  })
}

export const serverError = (error: Error): HttpResponse => {
  return ({
    statusCode: 500,
    body: error
  })
}
