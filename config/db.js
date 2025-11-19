require('dotenv').config(); // Carga las variables del archivo .env
const mysql = require('mysql2/promise');

// Configuración tomada del archivo .env
const conexionConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '', // Si en .env está vacío, usa ''
    database: process.env.DB_NAME || 'dsw_gestion',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Creamos el pool una sola vez
const pool = mysql.createPool(conexionConfig);

// Función helper para obtener una conexión del pool
async function getConnection() {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        console.error('Error fatal: No se pudo conectar a la Base de Datos.', error);
        throw error;
    }
}

// Test de conexión al iniciar la app (Solo para verificar en consola)
pool.getConnection()
    .then(connection => {
        console.log('✅ Conectado exitosamente a la base de datos MySQL');
        connection.release();
    })
    .catch(error => {
        console.error('❌ Error al conectar a la base de datos:', error.code);
    });

module.exports = {
    pool,
    getConnection
};