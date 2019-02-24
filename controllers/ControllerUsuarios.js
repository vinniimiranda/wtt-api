const db = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../config/auth')
const salt = bcrypt.genSaltSync(10)

module.exports = {
    async criar(req, res) {
        // ENCRIPTAÇÃO DE SENHA
        req.body.senha = await bcrypt.hash(req.body.senha, salt)

        // SALVA USUÁRIO NO BANCO DE DADOS
        db.query('INSERT INTO Cad_Usuario SET ?', req.body, (error, result) => {
            if (error) {
                if (error.errno == 1062) {
                    res.status(401).json({
                        erro: "E-mail já cadastrado!"
                    })
                }
                return new Error

            }
            return res.status(201).json(result)
        })
        //db.close()

    },
    async busca(req, res) {
        db.query('SELECT * FROM Cad_Usuario', (error, result) => {
            if (error) {
                return new Error
            }
            return res.status(201).json(result)
        })
        //db.close()

    },
    async detalhes(req, res) {
        db.query('SELECT * FROM Cad_Usuario WHERE ID = ?', req.params.id, (error, result) => {
            res.status(201).json(result)
        })
        //db.close()
    },

    async login(req, res) {
        const {
            email,
            senha
        } = req.body

        db.query('SELECT * FROM Cad_Usuario WHERE EMAIL = ? AND Situacao = "Ativo" ', email, async (error, result) => {
            if (error) {
                return new Error
            }
            if (result.length < 1) {
                res.status(401).json({
                    erro: "Usuário não encontrado para o e-mail digitado!"
                })
                return new Error
            }
            console.log(bcrypt.encodeBase64(result[0].senha))
            const senhaValida = await bcrypt.compare(senha, result[0].senha)
            if (!senhaValida) {
                res.status(401).json({
                    erro: "Senha inválida"
                })
                return new Error
            }
            const token = jwt.sign({id:result[0].id, tipo:result[0].tipo}, auth.secret, {
                expiresIn: 60*60*5
            })
            if (senhaValida) {
                res.status(201).json([{user:result[0]} , {token:token}])
            }
        })
        //db.close()
    },

    async atualizar(req, res) {
        req.body.senha = await bcrypt.hash(req.body.senha, salt)
        db.query('UPDATE Cad_Usuario SET ? WHERE ID = ?', [req.body, req.params.id], (error, result) => {
            if (error) {
                return new Error
            }
            return res.status(201).json(result)
        })
        //db.close()
    },

    async deletar(req, res) {
        db.query('DELETE FROM Cad_Usuario WHERE ID = ?', req.params.id, (error, result) => {
            if (error) {
                res.status(402).json(error)
                return new Error(error)
            }
            res.status(201).json(result)
        })
        //db.close()
    }
}