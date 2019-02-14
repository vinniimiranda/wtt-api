const db = require('../config/db')

module.exports = {
    async criar(req, res) {
        // Salva Empresa no Banco de Dados
        db.query('INSERT INTO Cad_Empresa SET ?', req.body, (error, result) => {
            if (error) {
                if (error.errno == 1062) {
                    res.status(401).json({
                        erro: "CNPJ já cadastrado na base de dados"
                    })
                }
                return new Error

            }
            return res.status(201).json(result)
        })

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
        db.query('UPDATE Cad_Empresa SET ? WHERE ID = ?', [req.body, req.params.id], (error, result) => {
            if (error) {
                res.status(402).json(error)
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
    }
}