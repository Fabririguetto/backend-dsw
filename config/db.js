require('dotenv').config();
const mysql = require('mysql2/promise');

const conexionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME ,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(conexionConfig);

async function getConnection() {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        console.error('Error fatal: No se pudo conectar a la Base de Datos.', error);
        throw error;
    }
}

pool.getConnection()
    .then(connection => {
        console.log('Base de datos conectada');
        connection.release();
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error.code);
    });

module.exports = {
    pool,
    getConnection
};