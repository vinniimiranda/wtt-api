
const router = require('express').Router()
const ControllerNotificacoes = require('../controllers/ControllerNotificacoes')
const authMiddleware = require('../middlewares/auth')

// router.use(authMiddleware)
router.get('/notificacoes', ControllerNotificacoes.busca)

module.exports = app => app.use('/api/v1', router)