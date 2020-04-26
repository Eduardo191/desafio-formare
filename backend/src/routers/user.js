const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

// Criar novo usuário
router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(404).send(e)
  }
})

// Login
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.name)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send()
  }
})

//Logout
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

//Deletar usuário
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (e) {
    res.status(500).send()
  }
})

//Retorna usuário pelo id
router.get('/users/all', async (req, res) => {
  try { 
    const users = await User.findById(req.body.id)
    res.send(users)
  } catch(e) {
    res.status(500).send()
  }
})

module.exports = router