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
                return new Error
            }
            return res.status(201).json(result)
        })
    },
    async criaTelefone(req, res) {
        // Salva contatos da empresa
        db.query('INSERT INTO Cad_Telefone SET ?', req.body, (error, result) => {
            if (error) {
                return new Error
            }
            return res.status(201).json(result)
        })
    },

    async busca(req, res) {
        db.query('SELECT * FROM Cad_Empresa', (error, result) => {
            if (error) {
                return new Error
            }
            return res.status(201).json(result)
        })

    },
    async detalhes(req, res) {
        db.query('SELECT * FROM Cad_Empresa WHERE ID = ?', req.params.id, (error, result) => {
            res.status(201).json(result)
        })
    },
    async atualizar(req, res) {
        db.query('UPDATE Cad_Empresa SET ? WHERE ID = ?', [req.body, req.params.id], (error, result) => {
            if (error) {
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