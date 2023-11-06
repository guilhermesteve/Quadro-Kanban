import { z } from 'zod';

const envSchema = z.object({
  REACT_APP_API_URL: z.string(),
  REACT_APP_API_LOGIN: z.string(),
  REACT_APP_API_PASS: z.string()
});

type EnvType = z.infer<typeof envSchema>;

const env: EnvType = envSchema.parse(process.env);

export default env;