const db = require('../config/db')
const multer = require('multer')
var storage = multer.memoryStorage()
var upload = multer({storage: storage});
const fs = require('fs');

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
        let data = fs.readFileSync('temp/upload/' + req.file.filename)
        
        let form = {
            descricao: req.body['descricao'],
            tipo: req.body['tipo'],
            arquivo: data,
            dtVencimento: req.body['dtVencimento'],
            nomeArquivo: req.file.filename,
            extensao: '.'+req.file.mimetype.split('/')[1],
            funcionario_id: req.body['funcionario_id'],
            dtCriacao: new Date()
        }
        
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
    }
}