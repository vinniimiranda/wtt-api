const router = require('express').Router()
const ControllerUsuario = require('../controllers/ControllerUsuario')
const authMiddleware = require('../middlewares/auth')

router.post('/login',  ControllerUsuario.login)
router.post('/usuario', ControllerUsuario.criar)
// router.use(authMiddleware)
router.get('/usuario', ControllerUsuario.busca)
router.get('/usuario/:id', ControllerUsuario.detalhes)
router.patch('/usuario/:id', ControllerUsuario.atualizar)
router.delete('/usuario/:id', ControllerUsuario.deletar)

module.exports = app => app.use('/api/v1', router)