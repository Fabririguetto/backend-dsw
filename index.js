const mysql = require('mysql2/promise');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const conexionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dsw_gestion'
};

async function getConnection() {
    try {
        const pool = await mysql.createPool(conexionConfig);
        return pool.getConnection();
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}

// Generic function to handle SQL queries and responses
async function handleQuery(req, res, query) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(query);

        if (rows.length === 0) {
            res.status(404).json({ error: 'No hay resultados encontrados.' });
        } else {
            console.table(rows);
            res.json(rows);
        }

        connection.release();
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Error en la consulta.' });
    }
}

// Route to fetch productos
app.get('/productos', async (req, res) => {
    const query = 'SELECT * FROM productos';
    await handleQuery(req, res, query);
});

app.post("/productos", async (req, res) => {
    const { articulo, descripcion, cantidad } = req.body;

    try {
        const connection = await getConnection();
        
        // Insertar el nuevo producto en la base de datos
        const query = "INSERT INTO productos (articulo, descripcion, cantidad) VALUES (?, ?, ?, ?)";
        const [result] = await connection.execute(query, [articulo, descripcion, cantidad]);

        connection.release(); // Liberar la conexión de vuelta al pool

        console.log('Producto ingresado correctamente:', result);

        res.status(200).json({ message: 'Producto ingresado correctamente' });
    } catch (error) {
        console.error('Error al ingresar el producto:', error);
        res.status(500).json({ error: 'Error al ingresar el producto' });
    }
});

// Route to fetch clientes
app.get('/clientes', async (req, res) => {
    const query = 'SELECT * FROM clientes';
    await handleQuery(req, res, query);
});

// Route to fetch sucursales
app.get('/sucursales', async (req, res) => {
    const query = 'SELECT * FROM sucursales';
    await handleQuery(req, res, query);
});

// Route to fetch ventas
app.get('/ventas', async (req, res) => {
    const query = 'SELECT * FROM ventas';
    await handleQuery(req, res, query);
});

// Route to fetch empleados
app.get('/empleados', async (req, res) => {
    const query = 'SELECT * FROM empleados';
    await handleQuery(req, res, query);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
