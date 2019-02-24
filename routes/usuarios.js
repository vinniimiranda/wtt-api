const express = require('express')
const router = express.Router()
const ControllerUsuario = require('../controllers/ControllerUsuarios')
const authMiddleware = require('../middlewares/auth')



router.post('/login',  ControllerUsuario.login)
router.post('/usuarios', ControllerUsuario.criar)
router.use(authMiddleware)
router.get('/usuarios', ControllerUsuario.busca)
router.get('/usuarios/:id', ControllerUsuario.detalhes)
router.patch('/usuarios/:id', ControllerUsuario.atualizar)
router.delete('/usuarios/:id', ControllerUsuario.deletar)

module.exports = app => app.use('/api/v1', router)