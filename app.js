import express from 'express'
import router from './src/router/index.js'
import { PORT, DBURI } from './src/config/config.js'
import handleErrer from './src/middleware/handleErrer.js'
import handle404 from './src/middleware/handle404.js'
import cors from 'cors'
import mongoose from 'mongoose'
mongoose
  .connect(DBURI)
  .then(() => {
    console.log('DB连接成功')
  })
  .catch(err => console.log(err))

const app = express()

app.use(express.json())
// app.use(express.urlencoded())
app.use(cors())
app.use(router)

app.use(handle404)
app.use(handleErrer)

app.listen(PORT, () => {
  console.log(`server is running at localhost:${PORT}`)
})

export default app