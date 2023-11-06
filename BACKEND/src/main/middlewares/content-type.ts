import { type Request, type Response, type NextFunction } from 'express'

const contentTypeMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.type('json')
  next()
}

export default contentTypeMiddleware
