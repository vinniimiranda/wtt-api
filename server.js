const express = require('express')
const app = express()
const cors = require('cors')
const requireDir = require('require-dir')
const bodyParser = require('body-parser')
const fs = require('fs')

const port = process.env.PORT || 3000
const HOST = '0.0.0.0'

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
requireDir("./models")


fs.readdir('./routes', async (err, arquivos) => {
    const routes = await arquivos
    routes.forEach(route => {
        require(`./routes/${route}`)(app)
    })
})

app.get('/api/v1/', (req, res ) => {
    res.send('ok')
})

app.listen(port, () => console.log(`API em funcionamento através da porta ${port}`))
