const express = require('express');
const cors = require('cors');
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

// --- 1. CONFIGURACIÓN DE SWAGGER ---
let swaggerDocument = {};
try {
    const swaggerPath = path.join(__dirname, '.', 'swagger.json');
    // Verificamos si el archivo existe antes de leerlo
    if (fs.existsSync(swaggerPath)) {
        const swaggerFileContent = fs.readFileSync(swaggerPath, 'utf8');
        swaggerDocument = JSON.parse(swaggerFileContent);
    } else {
        console.warn("⚠️ Advertencia: El archivo swagger.json no se encontró.");
    }
} catch (error) {
    console.error("=================================================================");
    console.error("ERROR CRÍTICO: No se pudo cargar o parsear swagger.json.");
    console.error("Detalle del error:", error.message);
    console.error("=================================================================");
}


// --- 2. IMPORTACIONES DE RUTAS ---
const authRoutes = require('./routes/auth');
const ventaRoutes = require('./routes/ventas');
const stockRoutes = require('./routes/stock');
const clienteRoutes = require('./routes/clientes');
const empleadoRoutes = require('./routes/empleados');
const sucursalRoutes = require('./routes/sucursales');
const dashboardRoutes = require('./routes/dashboardRoutes'); // Usaremos el archivo del Dashboard
// const detalleVentaRoutes = require('./routes/cargadetalleventa'); // No necesaria si se usa stockRoutes o ventasRoutes
// const rolesRoutes = require('./routes/roles'); // No necesaria en este momento

const app = express();

// --- 3. MIDDLEWARES GLOBALES ---
app.use(cors());
app.use(express.json());

// Montamos Swagger (si se cargó correctamente)
if (Object.keys(swaggerDocument).length > 0) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// --- 4. REGISTRO DE RUTAS (Simplificado) ---
// Mapeamos los archivos de ruta a prefijos URL

// Rutas sin prefijo (Ej: /login, /estadisticas)
app.use('/auth', authRoutes);

// Rutas de Recurso (Ej: /ventas, /stock/critico, etc.)
app.use('/ventas', ventaRoutes);
app.use('/stock', stockRoutes);
app.use('/clientes', clienteRoutes);
app.use('/empleados', empleadoRoutes);
app.use('/sucursales', sucursalRoutes);

// Ruta del Dashboard (Ej: /estadisticas)
// NOTA: Si tu hook llama a /estadisticas, debe estar sin prefijo. 
// Si tu hook llama a /api/dashboard/estadisticas, usa app.use('/api/dashboard', dashboardRoutes);
// Basado en el hook, usaremos solo el endpoint raíz:
app.use('/api/dashboard', dashboardRoutes);


const PORT = process.env.PORT || 3500;

// --- 5. ENCIENDIDO DEL SERVIDOR (Ajuste para TESTING) ---
if (require.main === module) { // Solo ejecuta listen si NO es llamado por Jest/Supertest
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
        if (Object.keys(swaggerDocument).length > 0) {
            console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
        }
    });
}

// Exportamos 'app' SIEMPRE, para que Jest/Supertest pueda probarlo
module.exports = { app };