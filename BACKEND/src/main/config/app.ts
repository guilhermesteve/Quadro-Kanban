import express from 'express'
import setupApp from './setup'
import setupRoutes from './routes'

const startServer = async (app: express.Application): Promise<void> => {
  setupApp(app)
  await setupRoutes(app)
}

const app = express()
startServer(app).catch((error) => {
  console.error('Error starting server:', error)
})

export default app
