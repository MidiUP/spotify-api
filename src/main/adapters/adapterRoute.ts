import { HttpRequest } from './../../presentation/protocols/http'
import { Controller } from './../../presentation/protocols/controller'
import { Request, Response } from 'express'

export const adapterRouter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request: HttpRequest = {
      header: req.params,
      body: req.body
    }

    const response = await controller.handle(request)

    if (response.statusCode >= 200 && response.statusCode <= 299) {
      return res.status(response.statusCode).json(response.body)
    } else {
      return res.status(response.statusCode).json({
        error: response.body.message
      })
    }
  }
}
