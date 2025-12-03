const express = require('express');
const cors = require('cors');
// Importar dotenv al inicio
require('dotenv').config();

// Importaciones necesarias para cargar archivos de forma segura
const fs = require('fs');
const path = require('path');

// Swagger imports
const swaggerUi = require('swagger-ui-express');

// Usar try/catch para cargar swagger.json de forma explícita
let swaggerDocument = {};
try {
    // CORRECCIÓN CLAVE: Usamos path.join para subir un nivel (..) y buscar 'swagger.json'.
    const swaggerPath = path.join(__dirname, '.', 'swagger.json');
    const swaggerFileContent = fs.readFileSync(swaggerPath, 'utf8');
    
    // Intentamos parsear el contenido
    swaggerDocument = JSON.parse(swaggerFileContent);
    
} catch (error) {
    console.error("=================================================================");
    console.error("ERROR CRÍTICO: No se pudo cargar o parsear swagger.json.");
    console.error("Detalle del error:", error.message);
    // Mensaje de ayuda para el usuario
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

const app = express();

// Middleware CORS y JSON
app.use(cors());
app.use(express.json());

// ===================================================
// CONFIGURACIÓN SWAGGER/API-DOCS
// La documentación estará accesible en http://localhost:3500/api-docs
// ===================================================
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

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    // Solo mostramos la URL de Swagger si el documento se cargó (no está vacío)
    if (Object.keys(swaggerDocument).length > 0) {
        console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
    } else {
        console.log("Documentación Swagger no disponible debido a error de carga.");
    }
});