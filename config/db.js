const mysql = require('mysql2')


const connection = mysql.createConnection({
	"host": 'us-cdbr-iron-east-03.cleardb.net',
	"user": 'bf4f3c2d8fa8e2',
	"password": 'd10993e7',
	"database": "heroku_777b21d9213d397"
});

module.exports = connection
