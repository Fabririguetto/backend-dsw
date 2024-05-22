const express = require('express');
const { exec } = require('child_process');
const { alta, modificacion, mostrar } = require('./index');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

exec('node index.js', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error al ejecutar el index.js: ${error}`);
        return;
    }
    console.log(`Salida del index.js:\n${stdout}`);
    console.error(`Errores del index.js:\n${stderr}`);
});

mostrar();