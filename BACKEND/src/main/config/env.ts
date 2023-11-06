import { z } from 'zod'
import dotenv from 'dotenv'
dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
  PORT: z.coerce.number().default(3000),
  ADMIN_LOGIN: z.string(),
  ADMIN_PASSWORD: z.string(),
  JWT_SECRET: z.string()

})

export type Env = z.infer<typeof envSchema>

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  throw new Error('Environment variable validation error')
}

export const env: Env = parsedEnv.data
