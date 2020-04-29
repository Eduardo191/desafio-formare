const express = require('express')
const userRouter = require('./routers/user')
const messageRouter = require('./routers/message')
const participantRouter = require('./routers/participant')
const cors = require('cors')
require('./db/mongoose')

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(messageRouter)
app.use(participantRouter)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})