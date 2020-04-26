const express = require('express')
const Message = require('../models/message')
const router = new express.Router()
const auth = require('../middleware/auth')

//Criar nova mensagem
router.post('/messages', auth, async (req, res) => {
  const message = new Message({
    ...req.body,
    owner: req.user._id
  })

  try {
    await message.save()
    res.status(201).send(message)
  } catch (e) {
    res.status(400).send(e)
  }
})

//Listagem de mensagens do usuário logado
//GET /messages?sortBy=createdAt:desc
router.get('/messages', auth, async (req, res) => {
  const sort = {}

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    await req.user.populate({
      path: 'messages',
      options: {
        sort
      }
    }).execPopulate()
    res.send(req.user.messages)
  } catch (e) {
    res.status(500).send()
  }
})

//Listagem de todas as mensagens
router.get('/messages/all', async (req, res) => {

  try {
    const messages = await Message.find({})
    res.send(messages)
  } catch (e) {
    res.status(500).send()
  }

})

//Deletar mensagem de usuário logado
router.delete('/messages/:id', auth, async (req, res) => {
  try {
    const message = await Message.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

    if (!message) {
      return res.status(404).send()
    }

    res.send(message)
  } catch (e) {
    res.status(500).send()
  }
})

//Deletar mensagem de qualquer usuário
router.delete('/messages/all/:id', async (req, res) => {
  try {
    const message = await Message.findOneAndDelete({ _id: req.params.id })

    if (!message) {
      return res.status(404).send()
    }

    res.send(message)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router