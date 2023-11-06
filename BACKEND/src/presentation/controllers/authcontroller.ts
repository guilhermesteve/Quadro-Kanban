import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../../main/config/env'

export class AuthController {
  login = async (req: Request, res: Response): Promise<any> => {
    try {
      const { login, password }: { login: string, password: string } = req.body

      if (login === env.ADMIN_LOGIN.trim() && password === env.ADMIN_PASSWORD.trim()) {
        const token = jwt.sign({ login }, env.JWT_SECRET, { expiresIn: '1h' })
        return res.status(200).json({ token })
      }

      return res.status(401).json({ error: 'Unauthorized' })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
}
