const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Importar las rutas desde los archivos de rutas
const productosRoutes = require('./routes/stock');
const clientesRoutes = require('./routes/clientes');
const sucursalesRoutes = require('./routes/sucursales');
const ventasRoutes = require('./routes/ventas');
const empleadosRoutes = require('./routes/empleados');

// Usar las rutas importadas
app.use(productosRoutes);
app.use(clientesRoutes);
app.use(sucursalesRoutes);
app.use(ventasRoutes);
app.use(empleadosRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
