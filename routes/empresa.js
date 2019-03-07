const express = require('express')
const router = express.Router()
const ControleEmpresas = require('../controllers/ControllerEmpresas')
const authMiddleware = require('../middlewares/auth')
const multer  = require('multer')
const multerConfig = require('../config/multer')


//router.use(authMiddleware)
// Empresa
router.post('/empresa', ControleEmpresas.criar)
router.get('/empresa', ControleEmpresas.busca)
router.get('/empresa/:id', ControleEmpresas.detalhes)
router.get('/indicadorEmpresa/:id', ControleEmpresas.indicadorEmpresa)
router.patch('/empresa/:id', ControleEmpresas.atualizar)
router.delete('/empresa/:id', ControleEmpresas.deletar)
router.post('/empresaAnexo',  multer(multerConfig).single('file'), ControleEmpresas.criaAnexo)
router.get('/empresaAnexo/:empresa_id', ControleEmpresas.buscaAnexo )

// Contato
router.post('/empresaContato', ControleEmpresas.criaContato)
router.get('/empresaContato/:empresa_id', ControleEmpresas.buscaContato)
router.patch('/empresaContato/:id', ControleEmpresas.atualizaContato)
router.delete('/empresaContato/:id', ControleEmpresas.deletaContato)

//Telefone
router.post('/empresaTelefone', ControleEmpresas.criaTelefone)
router.get('/empresaTelefone/:empresa_id', ControleEmpresas.buscaTelefone)
router.patch('/empresaTelefone/:id', ControleEmpresas.atualizaTelefone)
router.delete('/empresaTelefone/:id', ControleEmpresas.deletaTelefone)

// setTimeout(()=>{
//     ControleEmpresas.alerta()
// },100)

module.exports = app => app.use('/api/v1', router)