const {
     Notificacoes
} = require('../models/')
module.exports = {
    async busca (req, res) {
        try {
            const notificacoes = await Notificacoes.findAll()

            res.status(200).json(notificacoes)
        } catch (error) {
            res.status(400).json({error})
        }
    }
}