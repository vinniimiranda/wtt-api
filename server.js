const express = require('express')
const app = express()
const cors = require('cors')
const requireDir = require('require-dir')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
requireDir("./models")
require('./routes/usuarios')(app)


app.get('/api/v1/', (req, res ) => {
    res.send('ok')
})

app.listen(port, () => console.log(`API em funcionamento através da porta ${port}`))
