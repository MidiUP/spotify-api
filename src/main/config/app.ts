import express, { Express } from 'express'
import setupMiddlewares from './middleware'
import setupRoutes from './routes'

export const setupApp = (): Express => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
