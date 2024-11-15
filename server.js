const express = require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors')

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

console.log(readdirSync('./routes'))
readdirSync('./routes')
    .map((item) => app.use('/api', require('./routes/' + item)))


app.listen(3000, () => {
    console.log('Server listening on port 3000')
});