const mysql = require('mysql2');

const db =mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password: '1017214052',
        database: 'votaciones',
    }
);

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Base de datos conectada');
});

module.exports = db;
