const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-cgnch.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})