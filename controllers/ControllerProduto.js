const {
    Produto, Notificacoes
} = require('../models/')

const moment = require('moment')

module.exports = {
    async criar(req, res) {
        try {
            const { nome, descricao} = req.body
            
            const produto = await Produto.create({
                nome,
                descricao
            })

            try {
                await Notificacoes.create({
                    nome,
                    descricao,
                    situacao: `Criado`
                })

            } catch (error) {
                throw error
            }

            res.status(201).send(produto)

        } catch (erro) {
            res.status(401).json({erro})

        }


    },
    async busca(req, res) {
       try {
           
            const Produtos = await Produto.findAll()
            Produtos.forEach(produto => {
                produto.dataValues.createdAt = moment(produto.createdAt).locale('pt-br').format('L')
                 
            })
            res.status(200).json(Produtos)

       } catch (error) {
           
       }

    },
    async detalhes(req, res) {
        try{
            const { id } = req.params
            const produto = await Produto.findOne({
                where: {
                    id
                }
            })
            res.status(200).send(produto)

        }
        catch (erro) {
            res.status(401).json({erro})
        }
    },

    
    async atualizar(req, res) {

        try {
            const {  nome, descricao } = req.body
            const { id } = req.params
            
            const produto = await Produto.update({nome, descricao}, {where: {id}})
            
            if (produto[0] == 1) {
                const produtoAtualizado =  await Produto.findOne({
                    where: {
                        id
                    }})
                res.status(200).json(produtoAtualizado)

                try {
                    await Notificacoes.create({
                        nome,
                        descricao,
                        situacao: `Editado`
                    })
    
                } catch (error) {
                    throw error
                }
            }
            else {
                res.status(400).json({erro: "Erro ao atualizar produto"})
            }
        } catch (erro) {
            res.status(401).json({erro})

        }

    },

    async deletar(req, res) {

        try {
            const { id } = req.params
            

            const produto = await Produto.findOne({
                where: {
                    id
                }
            })

            try {
                await Notificacoes.create({
                    nome: produto.nome,
                    descricao: produto.descricao,
                    situacao: 'Removido'
                })
                produto.destroy()
                
            } catch (error) {
                throw error
            }
            

            res.status(200).json(produto)

        } catch (error) {
            res.status(401).json({erro})
        }
    }
}