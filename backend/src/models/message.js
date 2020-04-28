const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  ownerName: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message