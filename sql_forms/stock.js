const mysql = require('mysql2/promise');

// Route to fetch productos
app.get('/productos', async (req, res) => {
    const { nombre } = req.query; // Nombre a filtrar obtenido desde la query

    try {
        const connection = await getConnection();
        
        let query = 'SELECT * FROM productos';

        if (nombre) {
            query += ' WHERE articulo LIKE ? OR descripcion LIKE ?';
        }

        const [rows] = await connection.execute(query, [`%${nombre}%`, `%${nombre}%`]);

        connection.release(); // Liberar la conexión de vuelta al pool

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

app.post("/productos", async (req, res) => {
    const { articulo, descripcion, cantidad } = req.body;

    try {
        const connection = await getConnection();
        
        // Insertar el nuevo producto en la base de datos
        const query = "INSERT INTO productos (articulo, descripcion, cantidad) VALUES (?, ?, ?)";
        const [result] = await connection.execute(query, [articulo, descripcion, cantidad]);

        connection.release(); // Liberar la conexión de vuelta al pool

        console.log('Producto ingresado correctamente:', result);

        res.status(200).json({ message: 'Producto ingresado correctamente' });
    } catch (error) {
        console.error('Error al ingresar el producto:', error);
        res.status(500).json({ error: 'Error al ingresar el producto' });
    }
});

app.put('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const { articulo, descripcion, cantidad } = req.body;

    try {
        const connection = await getConnection();
        
        // Actualizar el producto en la base de datos
        const query = "UPDATE productos SET articulo = ?, descripcion = ?, cantidad = ? WHERE id = ?";
        const [result] = await connection.execute(query, [articulo, descripcion, cantidad, id]);

        connection.release(); // Liberar la conexión de vuelta al pool

        if (result.affectedRows > 0) {
            console.log('Producto actualizado correctamente:', result);
            res.status(200).json({ message: 'Producto actualizado correctamente' });
        } else {
            console.log('No se encontró el producto con el ID especificado');
            res.status(404).json({ error: 'No se encontró el producto con el ID especificado' });
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});