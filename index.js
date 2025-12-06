const express = require('express');
const cors = require('cors');
require('dotenv').config();

const fs = require('fs');
const path = require('path');

const swaggerUi = require('swagger-ui-express');

let swaggerDocument = {};
try {
    const swaggerPath = path.join(__dirname, '.', 'swagger.json');
    const swaggerFileContent = fs.readFileSync(swaggerPath, 'utf8');
    
    swaggerDocument = JSON.parse(swaggerFileContent);
    
} catch (error) {
    console.error("=================================================================");
    console.error("ERROR CRÍTICO: No se pudo cargar o parsear swagger.json.");
    console.error("Detalle del error:", error.message);
    console.error("Asegúrate de que 'swagger.json' esté en la carpeta 'backend-dsw'.");
    console.error("=================================================================");
}


const authRoutes = require('./routes/auth');
const ventaRoutes = require('./routes/ventas');
const stockRoutes = require('./routes/stock');
const clienteRoutes = require('./routes/clientes');
const empleadoRoutes = require('./routes/empleados');
const sucursalRoutes = require('./routes/sucursales');
const detalleVentaRoutes = require('./routes/cargadetalleventa');
const dashboardRoutes = require('./routes/dashboardRoutes');
const rolesRoutes = require('./routes/roles');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de la API
app.use('/auth', authRoutes);
app.use('/ventas', ventaRoutes);
app.use('/stock', stockRoutes);
app.use('/stockelim', stockRoutes); 
app.use('/clientes', clienteRoutes);
app.use('/empleados', empleadoRoutes);
app.use('/sucursales', sucursalRoutes);
app.use('/detalle_ventas', detalleVentaRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/roles', rolesRoutes);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    if (Object.keys(swaggerDocument).length > 0) {
        console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
    } else {
        console.log("Documentación Swagger no disponible debido a error de carga.");
    }
});