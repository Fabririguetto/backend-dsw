require('dotenv').config(); //Cargamos Variables 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Importamos Rutas
const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/stock');
const clientesRoutes = require('./routes/clientes');
const sucursalesRoutes = require('./routes/sucursales');
const ventasRoutes = require('./routes/ventas');
const empleadosRoutes = require('./routes/empleados');
const cargaDetalleRoutes = require('./routes/cargadetalleventa');

// Registramos Rutas
app.use(authRoutes);
app.use(productosRoutes);
app.use(clientesRoutes);
app.use(sucursalesRoutes);
app.use(ventasRoutes);
app.use(empleadosRoutes);
app.use(cargaDetalleRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});