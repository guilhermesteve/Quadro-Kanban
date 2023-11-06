/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { AuthController } from '../controllers/authcontroller'

export const authRouter = Router()
const authcontroller = new AuthController()

authRouter.post('/login', authcontroller.login)
