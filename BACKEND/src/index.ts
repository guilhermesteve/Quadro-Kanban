import app from './main/config/app'
import { env } from './main/config/env'

const port = env.PORT

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
