const express = require('express')
const userRouter = require('./routers/user')
const messageRouter = require('./routers/message')
require('./db/mongoose')

const app = express()
const port = 3000

app.use(express.json())
app.use(userRouter)
app.use(messageRouter)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})