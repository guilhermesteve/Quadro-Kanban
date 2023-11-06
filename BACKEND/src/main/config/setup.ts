import type express from 'express'
import cors from '../middlewares/cors'
import jsonParser from '../middlewares/json-parser'
import contentType from '../middlewares/content-type'

export default (app: express.Application): void => {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(jsonParser)
  app.use(contentType)
}
