const express = require('express')
const router = new express.Router()
const Chance = require('chance')

//retorna 117 nomes aleatórios de participantes
router.get('/participants', async (req, res) => {
  const names = []
  var chance = new Chance();
  try {
   for (var i = 0; i < 117; i ++) {
    names.push(chance.name( { nationality: 'en' }))
   }
   res.send(names)
  } catch(err) {
    res.status(400).send()
  }
})

module.exports = router