import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'

const secretKey: string = env.JWT_SECRET

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization

  if (authHeader != null) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, secretKey, (err, user) => {
      if (err !== null) {
        return res.sendStatus(401)
      }

      req.body.user = user as any
      next()
    })
  } else {
    res.sendStatus(401)
  }
}
