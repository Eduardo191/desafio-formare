const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'thisismyapp')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (name) => {
  const user = await User.findOne({ name })

  if (!user) {
      throw new Error('Unable to login')
  }

  return user
}

userSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'owner'
})

const User = mongoose.model('User', userSchema)

module.exports = User

