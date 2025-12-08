const express = require('express');
const cors = require('cors');
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');


let swaggerDocument = {};
try {
    const swaggerPath = path.join(__dirname, '.', 'swagger.json');

    if (fs.existsSync(swaggerPath)) {
        const swaggerFileContent = fs.readFileSync(swaggerPath, 'utf8');
        swaggerDocument = JSON.parse(swaggerFileContent);
    } else {
        console.warn("Advertencia: El archivo swagger.json no se encontró.");
    }
} catch (error) {
    console.error("ERROR: No se pudo cargar o parsear swagger.json.");
    console.error("Detalle del error:", error.message);
}


const authRoutes = require('./routes/auth');
const ventaRoutes = require('./routes/ventas');
const stockRoutes = require('./routes/stock');
const clienteRoutes = require('./routes/clientes');
const empleadoRoutes = require('./routes/empleados');
const sucursalRoutes = require('./routes/sucursales');
const dashboardRoutes = require('./routes/dashboardRoutes'); 
const rolRoutes = require('./routes/roles');

const app = express();
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000'

app.use(cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());


if (Object.keys(swaggerDocument).length > 0) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use('/auth', authRoutes);


app.use('/ventas', ventaRoutes);
app.use('/stock', stockRoutes);
app.use('/clientes', clienteRoutes);
app.use('/empleados', empleadoRoutes);
app.use('/sucursales', sucursalRoutes);
app.use('/roles', rolRoutes);
app.use('/api/dashboard', dashboardRoutes);


const PORT = process.env.PORT || 3500;


if (require.main === module) { 
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
        if (Object.keys(swaggerDocument).length > 0) {
            console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
        }
    });
}

module.exports = { app };