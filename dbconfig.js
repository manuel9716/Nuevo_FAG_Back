// dbConfig.js

const sql = require('mssql');

// Configuración de la base de datos
const dbConfig = {
    user: 'sa',
    password: '12345678',
    server: 'localhost\\MSSQLSERVER01',
    database: 'usuarios_bitwan',
    options:{
        trustedconnection: false,
        enableArithAbort: true,
        encrypt: false
        //intancename: 'nombre instancia'
    }
};

module.exports = dbConfig;