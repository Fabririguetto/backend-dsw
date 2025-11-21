require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// --- IMPORTAR RUTAS ---
const authRoutes = require('./routes/auth'); // <--- ¡ESTA ES LA QUE FALTABA!
const productosRoutes = require('./routes/stock');
const clientesRoutes = require('./routes/clientes');
const sucursalesRoutes = require('./routes/sucursales');
const ventasRoutes = require('./routes/ventas');
const empleadosRoutes = require('./routes/empleados');
const cargaDetalleRoutes = require('./routes/cargadetalleventa'); // La de artículos

// --- REGISTRAR RUTAS ---
app.use(authRoutes); // <--- ¡IMPORTANTE! Habilitar el login
app.use(productosRoutes);
app.use(clientesRoutes);
app.use(sucursalesRoutes);
app.use(ventasRoutes);
app.use(empleadosRoutes);
app.use(cargaDetalleRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});