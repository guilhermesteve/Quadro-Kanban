/* eslint-disable @typescript-eslint/no-misused-promises */
import type express from 'express'

import { taskRouter } from '../../presentation/routes/task-routes'
import { authRouter } from '../../presentation/routes/auth-routes'
import { authenticate } from '../middlewares/authenticate'

export default async (app: express.Application): Promise<void> => {
  app.use('/api', authRouter)
  app.use('/api', authenticate, taskRouter)
}
