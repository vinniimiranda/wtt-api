
const router = require('express').Router()
const ControllerProduto = require('../controllers/ControllerProduto')
const authMiddleware = require('../middlewares/auth')

// router.use(authMiddleware)
router.post('/produto', ControllerProduto.criar)
router.get('/produto', ControllerProduto.busca)
router.get('/produto/:id', ControllerProduto.detalhes)
router.patch('/produto/:id', ControllerProduto.atualizar)
router.delete('/produto/:id', ControllerProduto.deletar)

module.exports = app => app.use('/api/v1', router)