const db = require('../config/db')
const multer = require('multer')
var storage = multer.memoryStorage()
var upload = multer({storage: storage});
const fs = require('fs');
const ControllerEmail = require('./ControllerEmail')
const moment = require('moment')



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
        let html = `<!DOCTYPE html>
        <html lang="pt-br">
        <head>
        <style>
                th{
                   text-align: center;
                   background-color: #163eac;
                   margin: none;
                   border: none;
                   padding: none;
                   color: #fff;
                   border-spacing: 0px;
                   overflow-wrap: break-word;
                   word-wrap: unset;
                }
                td{
                    height: 25px;
                    width: 20%;
                    vertical-align: bottom;
                }
                th, td {
                    padding: 15px ;
                    text-align: center;
                    border-bottom: 1px solid #ddd;
                  }
                  tbody> tr:hover {
                      transition: .5s;
                      
                      background-color: #f5f5f5;
                    }
                
                h2{
                    color: #163eac;
                }
                table{
                    border-collapse: collapse;
                    
                }
            </style>
        </head>
        <body>`
        let subject = "Relatório de Documentos - Funcionários"

        db.query(`SELECT A.descricao, A.dtVencimento, A.nomeArquivo, A.Tipo, F.nome, F.cpf FROM anexo_funcionario as A Inner Join Cad_Funcionario as F On A.funcionario_id = F.id WHERE dtVencimento BETWEEN DATE_SUB(now(), INTERVAL 60 DAY) AND NOW()`, async (erro, result) => {
            html += `
                        <h2>Documentos Vencidos ${result.length}</h2>    
                        <table class='display'>
                            <thead>
                                <tr>
                                    <th>Documento</th>
                                    <th>Data de Vencimento</th>
                                    <th>Nome do Arquivo</th>
                                    <th>Tipo</th>
                                    <th>CPF Funcionário</th>
                                    <th>Nome Funcionario</th>
                                </tr>
                            </thead>
                            <tbody>
                        `
                result.forEach(doc => {
                        html += `       <tr>
                                    <td>${doc.descricao}</td>
                                    <td>${doc.nomeArquivo}</td>
                                    <td>${moment(doc.dtVencimento).locale('pt-br').format('L')}</td>
                                    <td>${doc.Tipo}</td>
                                    <td>${doc.cpf}</td>
                                    <td>${doc.nome}</td>
                                </tr>`
                    
                })
                html += `
                            </tbody>
                    </table>
                    <br><br><hr>`

            db.query(`SELECT A.descricao, A.dtVencimento, A.nomeArquivo, A.Tipo, F.nome, F.cpf FROM anexo_funcionario as A Inner Join Cad_Funcionario as F On A.funcionario_id = F.id WHERE dtVencimento BETWEEN NOW() AND DATE_SUB(now(), INTERVAL -60 DAY)`, async (erro, result) => {
                
                html += `
                        <h2>Documentos à Vencer ${result.length}</h2>    
                        <table class='display'>
                            <thead>
                                <tr>
                                    <th>Documento</th>
                                    <th>Nome do Arquivo</th>
                                    <th>Data de Vencimento</th>
                                    <th>Tipo</th>
                                    <th>CPF Funcionário</th>
                                    <th>Nome Funcionario</th>
                                </tr>
                            </thead>
                            <tbody>
                        `
                result.forEach(doc => {
                        html += `       <tr>
                                    <td>${doc.descricao}</td>
                                    <td>${doc.nomeArquivo}</td>
                                    <td>${moment(doc.dtVencimento).locale('pt-br').format('L')}</td>
                                    <td>${doc.Tipo}</td>
                                    <td>${doc.cpf}</td>
                                    <td>${doc.nome}</td>
                                </tr>`
                    
                })
                html += `
                            </tbody>
                    </table>
                    </body>
                    </html>`
                console.log(html);
                
                ControllerEmail.main(html, subject)
            })
        })
        
        
    }
}
