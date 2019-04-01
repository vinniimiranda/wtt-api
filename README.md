# WTT API 

API Rest para avaliação de teste proposto.

# Docker 

Para rodar no Docker é necessário fazer o build da imagem que está configurado no Dockerfile, depois disso basta acessar http://0.0.0.0:3000 e consumir a API à partir dos endpoints 

# Rodando o projeto

Para rodar localmente siga as seguintes instruções: 

- $ git clone https://github.com/vinniimiranda/wtt-api.git
- $ cd wtt-api
- $ npm install ou use o yarn install
- $ npm start ou use yarn start


# Banco de dados

O banco de dados utilizado foi o MySQL através do Sequelize, ele está hospedado online com servidor na América Latina para que a comunicação com a API seja mais rápida possível.

Para usar em outro banco de dados altere o arquivo database.js na pasta config e rode as migrations com o comando: 
$ sequelize db:migrate (para isso é necessário ter o sequelize-cli instalado globalmente na máquina)


# Deploy 

Esta API está hospedada/rodando no Heroku e é acessível através do link: https://wtt-api.herokuapp.com/api/v1

# Endpoints

API possui os seguintes endpoints:

Autenticação: 
- POST '/login'

Usuario
- GET '/usuario'
- POST '/usuario'
- PATCH '/usuario/:id'
- DELETE '/usuario/:id'

Produto
- GET '/produto'
- POST '/produto'
- PATCH '/produto/:id'
- DELETE '/produto/:id'

Notificações
- GET '/notificacoes'

