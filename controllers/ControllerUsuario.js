const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../config/auth')
const salt = bcrypt.genSaltSync(10)
const {
    User
} = require('../models/')
module.exports = {
    async criar(req, res) {
        // ENCRIPTAÇÃO DE SENHA
        if (req.body.senha) req.body.senha = await bcrypt.hash(req.body.senha, salt)

        // DECLARAÇÃO DE VARIÁVEIS
        const {
            nome,
            email,
            senha,
            situacao,
            tipo
        } = req.body

        // CRIAÇÃO DE USUÁRIO NO BD
        try {
            const newUser = await User.create({
                nome,
                email,
                password: senha,
                situacao,
                tipo
            })

            // ENVIO DE RESPOSTA PARA O CLIENT
            res.status(201).send(newUser)

        } catch (erro) {
            if (erro.original.errno === 1062) {
                res.status(401).json({
                    erro: "E-mail já cadastrado em sistema"
                })
            }

        }


    },
    async busca(req, res) {
        const Users = await User.findAll()

        return res.status(201).json(Users)

    },
    async detalhes(req, res) {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).send(user)

    },

    async login(req, res) {
        const {
            email,
            senha
        } = req.body

        const user = await User.findOne({
            where: {
                email,

            }
        })
        if (user == null) {
            res.status(401).json({
                erro: "Usuário não encontrado para o e-mail digitado!"
            })
            return new Error('Usuário não encontrado para o e-mail digitado!')
        }
        const validPassword = await bcrypt.compare(senha, user.password)

        if (!validPassword) {
            res.status(401).json({
                erro: "Senha inválida"
            })
            return new Error('Senha inválida')
        }

        if (user.situacao != "Ativo") {
            res.status(401).json({
                erro: "Usuário inativo, entre em contato com o administrador"
            })
            return new Error('Usuário inativo, entre em contato com o administrador')
        }
        const token = jwt.sign({
            id: user.id,
            tipo: user.tipo
        }, auth.secret, {
            expiresIn: 60 * 60 * 5
        })

        res.status(200).json({
            user,
            token
        })

    },

    async atualizar(req, res) {

        const {
            nome,
            email,
            situacao,
            tipo
        } = req.body
        const id = req.params.id
        const user = await User.findOne({
            where: {
                id
            }
        })

        user.update({
            nome,
            email,
            situacao,
            tipo,
        })

        if (req.body.senha) {
            password = await bcrypt.hash(req.body.senha, salt)
            user.update({
                password
            })
        }

        res.status(201).json(user)

    },

    async deletar(req, res) {

        const { id } = req.params
        
        const user = await User.destroy({
            where: {
                id
            }
        })

        res.status(200).json(user)

    }
}