/* tp desarrollo backend entrega 1 */
const readline = require('readline');

let productos = {
    producto: [ 
        { 
            id,
            articulo,
            descripcion,
            cantidad_stock,
            precio_venta
        }
    ]
};

let contadorProductos = 0;

function generarID() {
    return contadorProductos++;
}

function menuprincipal() {
    console.clear();
    console.log("\n|-----------------MENÚ PRINCIPAL-----------------|");
    console.log(`
    [1] Alta de productos
    [2] Modificacion de productos
    `);
}

function alta() {
    let id = generarID();
    let articulo = prompt("Ingrese el articulo del artículo:");
    let descripcion = prompt("Ingrese la descripción del artículo:");
    let cantidad_stock = prompt("Ingrese la cantidad en stock:");
    let precio_venta = prompt("Ingrese el precio de venta:");
    
    let nuevoProducto = {
        id: id,
        articulo: articulo,
        descripcion: descripcion,
        cantidad_stock: cantidad_stock,
        precio_venta: precio_venta
    };

    productos.push(nuevoProducto)
}

let opcion = -1;

while (opcion !== 0) {
    menuprincipal();
    let opcion = parseInt(prompt("Elija la opción deseada: "));

    while (opcion < 0 || opcion > 2) {
        opcion = parseInt(prompt("\n¡OPCIÓN INCORRECTA!: Elija la opción deseada: "));
    }

    if (opcion === 1) {
        Alta();
    } else if (opcion === 2) {
       /* modificacion; */
    }
}