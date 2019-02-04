const express = require('express')
const router = express.Router()
const ControleEmpresas = require('../controllers/ControllerEmpresas')
const authMiddleware = require('../middlewares/auth')



//router.use(authMiddleware)
router.post('/empresa', ControleEmpresas.criar)
router.post('/empresaContato', ControleEmpresas.criaContato)
router.post('/empresaTelefone', ControleEmpresas.criaTelefone)
router.get('/empresa', ControleEmpresas.busca)
router.get('/empresa/:id', ControleEmpresas.detalhes)
router.patch('/empresa/:id', ControleEmpresas.atualizar)
router.delete('/empresa/:id', ControleEmpresas.deletar)

module.exports = app => app.use('/api/v1', router)