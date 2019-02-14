const jwt = require('jsonwebtoken')
const authConfig  = require('../config/auth.json')

module.exports = (req, res, next) => {
    const token = req.headers.token

    
    if(!token) {
        if(!res.headersSent){
            return res.status(401).send({ erro: "Token não informado"});
        }
    }
    try{
        
        jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err){
            if(!res.headersSent) {
                res.status(401).send({erro: "Tokén inválido"}, 0 , 500);
            }
            
        }
        
       req.userId = decoded.id
       req.tipoUsuario = decoded.tipo 
       
        

        return next()
        
    })
    
    
    }
    catch(erro){ return new Error}
}