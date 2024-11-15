const express = require('express')
const router = express.Router()
const { read, readID, create, update, remove } = require('../controller/Product')

router.get('/product', read)
router.get('/product/:id', readID)
router.post('/product', create)
router.put('/product/:id', update)
router.delete('/product/:id', remove)

module.exports = router