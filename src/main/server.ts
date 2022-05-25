import { setupApp } from './config/app'
import 'dotenv/config'

const app = setupApp()

app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.port}`))
