const db = require('../config/db')
const multer = require('multer')
var storage = multer.memoryStorage()
var upload = multer({storage: storage});
const fs = require('fs');
const ControllerEmail = require('./ControllerEmail')



module.exports = {
    async criar (req, res) {
        db.query('INSERT INTO Cad_Funcionario SET ?', req.body, (error, result) => {
            if (error){ 
                
                res.status(401).json(error)
                return new Error
            }
            res.status(201).json(result)
        })
    },

    async busca (req, res){
        
        db.query(`SELECT f.id, f.cpf, f.rg, f.dtEmissaoRg, f.orgaoExpedidor, f.tituloEleitor, f.tipoContratacao, f.dtContratacao, f.nome, f.email, f.dtNascimento, f.nomeDaMae, f.nomeDoPai, f.apelido,
                  f.estadoCivil, f.empresa_id, e.cnpj as empresaCnpj, f.cep, f.logradouro, f.numero, f.complemento,
                  f.bairro, f.cidade, f.uf , e.razaoSocial as empresaRazaoSocial
                  FROM Cad_Funcionario as f INNER JOIN Cad_Empresa as e on f.empresa_id  = e.id`, (error, result) => {
            if (error){ 
                res.status(401).json(error)
                return new Error
            }
            res.status(201).json(result)
        })
    },
    async buscaPorEmpresa (req, res) {
        db.query(`SELECT f.id, f.cpf, f.rg, f.dtEmissaoRg, f.orgaoExpedidor, f.tituloEleitor, f.tipoContratacao, f.dtContratacao, f.nome, f.email, f.dtNascimento, f.nomeDaMae, f.nomeDoPai, f.apelido,
                  f.estadoCivil, f.empresa_id, e.cnpj as empresaCnpj, f.cep, f.logradouro, f.numero, f.complemento,
                  f.bairro, f.cidade, f.uf , e.razaoSocial as empresaRazaoSocial
                  FROM Cad_Funcionario as f INNER JOIN Cad_Empresa as e on f.empresa_id  = e.id WHERE  f.empresa_id = ?`, req.params.empresa_id, (error, result) => {
            if (error) {
                res.status(401).json(error)
                return new Error
            }
            return res.status(201).json(result)
        })
    },

    async detalhes(req, res) {
        db.query('SELECT * FROM Cad_Funcionario WHERE id = ?', req.params.id, (error, result) => {
            if (error) {
                res.status(401).json(error)
                return new Error
            }
            return res.status(201).json(result)
        })
    },

    async atualizar(req, res) {
        db.query('UPDATE Cad_Funcionario SET ? WHERE id = ?', [req.body, req.params.id], (error, result) => {
            if (error) {
                console.log(error)
                res.status(401).json(error)
                return new Error
            }
            return res.status(201).json(result)
        })
    },
    async deletar(req, res) {
        db.query('DELETE FROM Cad_Funcionario WHERE id = ?', req.params.id, (error, result) => {
            if (error) {
                res.status(401).json(error)
                return new Error(error)
            }
            
            res.status(201).json(result)
        })
    },
    async criaAnexo(req, res) {
        
        
        let form = {
            descricao: req.body['descricao'],
            tipo: req.body['tipo'],
            caminhoArquivo: req.file.filename.replace(/\s/g, ''),
            dtVencimento: req.body['dtVencimento'],
            nomeArquivo: req.file.originalname.replace(/\s/g, ''),
            extensao: '.'+req.file.mimetype.split('/')[1],
            funcionario_id: req.body['funcionario_id'],
            dtCriacao: new Date()
        }
        
        console.log(form);
        
        db.query('INSERT INTO anexo_funcionario SET ? ', form, (error, result) => {
            if (error) {
                console.log(error)
                res.status(401).json(error)
                return new Error(error)
            }
            
            res.status(201).json(result)
        })
    },
    async buscaAnexo(req, res) {
        db.query('SELECT * FROM anexo_funcionario WHERE funcionario_id = ?', req.params.funcionario_id, (error, result) => {
            if (error) {
                res.status(401).json(error)
                return new Error(error)
            }
            
            res.status(201).json(result)
        })
    },
    async deletaAnexo (req, res) {
        db.query('DELETE FROM  anexo_funcionario WHERE id = ' , req.params.id, (error, result) => {
            if (error) {
                res.status(401).json(error)
                return new Error(error)
            }
            
            res.status(201).json(result)
        })
    },
    async alerta() {
        
        let qtdVencidos=0
        let qtdAVencer = 0
        let html = ""
        let subject = "Relatório de Documentos Vencidos - Funcionários        "

        db.query(`SELECT COUNT(1) as qtdVencidos FROM anexo_funcionario WHERE dtVencimento BETWEEN DATE_SUB(now(), INTERVAL 60 DAY) AND NOW()`, async (erro, result) => {
            qtdVencidos = result[0].qtdVencidos 
            db.query(`SELECT COUNT(1) as qtdAVencer FROM anexo_funcionario WHERE dtVencimento BETWEEN NOW() AND DATE_SUB(now(), INTERVAL -60 DAY)`, async (erro, result) => {
                qtdAVencer =  result[0].qtdAVencer
                html = `<h1>Quantidade de Documentos Vencidos: ${qtdVencidos}</h1>
                        <h1>Quantidade de Documentos à Vencer ${qtdAVencer}</h1>`
    
                ControllerEmail.main(html, subject)
            })
        })
        
        
    }
}