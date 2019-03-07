const express = require('express')
const router = express.Router()
const ControllerFuncionario = require('../controllers/ControllerFuncionarios')
const authMiddleware = require('../middlewares/auth')
const multer  = require('multer')
const multerConfig = require('../config/multer')


router.use(authMiddleware)
router.post('/funcionario', ControllerFuncionario.criar)
router.get('/funcionario', ControllerFuncionario.busca)
router.get('/funcionarioPorEmpresa/:empresa_id', ControllerFuncionario.buscaPorEmpresa)
router.get('/funcionario/:id', ControllerFuncionario.detalhes)
router.patch('/funcionario/:id', ControllerFuncionario.atualizar)
router.delete('/funcionario/:id', ControllerFuncionario.deletar)

router.post('/funcionarioAnexo', multer(multerConfig).single('file'), ControllerFuncionario.criaAnexo)
router.get('/funcionarioAnexo/:funcionario_id', ControllerFuncionario.buscaAnexo)
router.delete('ControllerFuncionario/:id', ControllerFuncionario.deletaAnexo)

// setTimeout(()=>{
//     ControllerFuncionario.alerta()
// },100)

module.exports = app => app.use('/api/v1', router)

