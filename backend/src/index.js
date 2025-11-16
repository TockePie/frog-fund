// @ts-check
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import errorHandler from './middlewares/error.js'
import routes from './routes/index.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 8000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', routes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
