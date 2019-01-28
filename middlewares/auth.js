const jwt = require('jsonwebtoken')
const authConfig  = require('../config/auth.json')

module.exports = (req, res, next) => {
    const token = req.headers.token


    if(!token) {
        return res.status(401).send({ erro: "Token não informado"})
    }
    
    jwt.verify(token, authConfig.secret, (err, decode) => {
        if(err)
            return res.status(401).send({erro: "Tokén inválido"})

        req.id = decode.id
        //req.nomeUser = decode.nome

        return next()
    })

    next()
}