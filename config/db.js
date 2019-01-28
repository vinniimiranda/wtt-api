const mysql = require('mysql2')


const connection = mysql.createConnection({
	"host": 'sql10.freemysqlhosting.net	',
	"user": 'sql10276074',
	"password": '9TKFgJVFqi',
	"database": "sql10276074"
});

module.exports = connection
