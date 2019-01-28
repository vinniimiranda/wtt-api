const express = require('express')
const app = express()
const cors = require('cors')
const requireDir = require('require-dir')
const bodyParser = require('body-parser')

const port = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
requireDir("./models")
require('./routes/usuarios')(app)



app.listen(port, () => console.log('API em funcionamento!'))
