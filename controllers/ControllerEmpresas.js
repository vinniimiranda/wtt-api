const db = require('../config/db')
const ControllerEmail = require('./ControllerEmail')

module.exports = {
    async criar(req, res) {
        // Salva Empresa no Banco de Dados
        db.query('INSERT INTO Cad_Empresa SET ?', req.body, (error, result) => {
            if (error) {
                if (error.errno == 1062) {
                    res.status(403).json({
                        erro: "CNPJ já cadastrado na base de dados"
                    })
                }
                return new Error

            }
            return res.status(201).json(result)
        })

    },
    async indicadorEmpresa (req, res) {
        const empresa_id = req.params.id
        if (empresa_id != 0){
            db.query('SELECT COUNT(1) as qtdEmpresa, (SELECT COUNT(1) FROM Cad_Funcionario WHERE empresa_id = Empresa.id) as qtdFuncionarios FROM Cad_Empresa as Empresa WHERE ID = ? ', empresa_id,  (error, result) => {
                if (error) {
                    res.status(401).json(error)
                    return new Error
                }
                return res.status(201).json(result)
            }) 
        }
        // Busca todas empreas 
        else{
            db.query(`SELECT COUNT(1) as qtdEmpresa,
                      (SELECT COUNT(1) FROM Cad_Funcionario) as qtdFuncionarios,
                      (SELECT COUNT(1) FROM anexo_funcionario WHERE dtVencimento BETWEEN DATE_SUB(now(), INTERVAL 60 DAY) AND NOW()) AS qtdFuncionarioDocVencidos,
                      (SELECT COUNT(1) FROM anexo_funcionario WHERE dtVencimento  NOW() AND BETWEEN DATE_SUB(now(), INTERVAL -60 DAY)) AS qdtFuncionariosDocAVencer
                      FROM Cad_Empresa  `,  (error, result) => {
                if (error) {
                    res.status(401).json(error)
                    return new Error
                }
                return res.status(201).json(result)
            })
        }

    },
    async criaContato(req, res) {
        // Salva contatos da empresa
        db.query('INSERT INTO Cad_Contato SET ?', req.body, (error, result) => {
            if (error) {
                res.status(401).json(error)
                return new Error
            }
            return res.status(201).json(result)
        })
    },
    async buscaContato(req, res) {
        
        db.query('SELECT * FROM Cad_Contato WHERE empresa_id = ?', req.params.empresa_id, (error, result) => {
            if (error) {
                res.status(401).json(error)
                return new Error
            }
            return res.status(201).json(result)
        })
    },
    async atualizaContato(req, res){
        db.query('UPDATE Cad_Contato SET ? WHERE id = ?', [req.body, req.params.id], (error, result) => {
            if (error) {
                res.status(401).json(error)
                return new Error
            }
            return res.status(201).json(result)
        })
    },
    async deletaContato(req, res){
        db.query('DELETE FROM Cad_Contato WHERE id = ?', req.params.id, (error, result) => {
            if (error) {
                res.status(401).json(error)
                return new Error
            }
            return res.status(201).json(result)
        })
    },
    async criaTelefone(req, res) {
        // Salva contatos da empresa
        db.query('INSERT INTO Cad_Telefone SET ?', req.body, (error, result) => {
            if (error) {
                res.status(401).json(error)
                return new Error
            }
            return res.status(201).json(result)
        })
    },
    async buscaTelefone(req, res) {
        db.query('SELECT * FROM Cad_Telefone WHERE empresa_id = ?', req.params.empresa_id, (error, result) => {
            if (error) {
                res.status(401).json(error)
                return new Error
            }
            return res.status(201).json(result)
        })
    },
    async atualizaTelefone(req, res){
        db.query('UPDATE Cad_Telefone SET ? WHERE id = ?', [req.body, req.params.id], (error, result) => {
            if (error) {
                res.status(401).json(error)
                return new Error
            }
            return res.status(201).json(result)
        })
    },
    async deletaTelefone(req, res){
        db.query('DELETE FROM Cad_Telefone WHERE id = ?', req.params.id, (error, result) => {
            if (error) {
                res.status(401).json(error)
                return new Error
            }
            return res.status(201).json(result)
        })
    },

    async busca(req, res) {
        
        db.query('SELECT * FROM Cad_Empresa', (error, result) => {
            if (error) {
                res.status(402).json(error)
                return new Error
            }
            return res.status(201).json(result)
        })

    },
    async detalhes(req, res) {
        
        let empresa = []
        db.query('SELECT * FROM Cad_Empresa WHERE ID = ?', req.params.id, (error, result) => {
            empresa.push({empresa: result[0]})
            db.query('SELECT * FROM Cad_Contato WHERE Empresa_id = ?',  req.params.id, (error, result) => {
                empresa.push({contatos: result})
                db.query('SELECT * FROM Cad_Telefone WHERE Empresa_id = ?', req.params.id, (error, result) => {
                    empresa.push({telefones: result})  
                     
                    res.status(201).json(empresa)
                })
            })
        })
        
        
        
    },
    async atualizar(req, res) {
        console.log(req.body);
        
        db.query('UPDATE Cad_Empresa SET ? WHERE ID = ? ', [req.body, req.params.id], (error, result) => {
            if (error) {
                res.status(401).json(error)
                return new Error
            }
            return res.status(201).json(result)
        })
    },
    async deletar(req, res) {
        db.query('DELETE FROM Cad_Empresa WHERE ID = ?', req.params.id, (error, result) => {
            if (error) {
                res.status(402).json(error)
                return new Error(error)
            }
            
            res.status(201).json(result)
        })
    },
    async criaAnexo(req, res) {
        
        
        let form = {
            descricao: req.body['descricao'],
            tipo: req.body['tipo'],
            caminhoArquivo: req.file.filename,
            dtVencimento: req.body['dtVencimento'],
            nomeArquivo: req.file.originalname,
            extensao: '.'+req.file.mimetype.split('/')[1],
            empresa_id: req.body['empresaId'],
            dtCriacao: new Date()
        }
        
        db.query('INSERT INTO anexo_empresa SET ? ', form, (error, result) => {
            if (error) {
                console.log(error)
                res.status(401).json(error)
                return new Error(error)
            }
            
            res.status(201).json(result)
        })
    },
    async buscaAnexo(req, res) {
        db.query('SELECT * FROM anexo_empresa WHERE empresa_id = ?', req.params.empresa_id, (error, result) => {
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
        let subject = "Relatório de Documentos Vencidos - Empresas        "

        db.query(`SELECT COUNT(1) as qtdVencidos FROM anexo_empresa WHERE dtVencimento BETWEEN DATE_SUB(now(), INTERVAL 60 DAY) AND NOW()`, async (erro, result) => {
            qtdVencidos = result[0].qtdVencidos 
            db.query(`SELECT COUNT(1) as qtdAVencer FROM anexo_empresa WHERE dtVencimento BETWEEN NOW() AND DATE_SUB(now(), INTERVAL -60 DAY)`, async (erro, result) => {
                qtdAVencer =  result[0].qtdAVencer
                html = `<h1>Quantidade de Documentos Vencidos: ${qtdVencidos}</h1>
                        <h1>Quantidade de Documentos à Vencer ${qtdAVencer}</h1>`
    
                ControllerEmail.main(html, subject)
            })
        })
    }

}