const readline = require('readline');


let productos = {
    producto: []
};

let contadorProductos = 1;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function generarID() {
    return contadorProductos++;
}

function menuprincipal() {
    console.clear();
    console.log("\n|-----------------MENÚ PRINCIPAL-----------------|");
    console.log(`
    [1] Alta de productos
    [2] Modificacion de productos
    [3] Ver productos
    [0] Salir
    `);
}

function alta() {
    let id_prod = generarID();

    rl.question('Ingrese el artículo: ', (art) => {
        if (typeof art !== 'string' || art.trim() === '') {
            console.log("El artículo debe ser un texto no vacío.");
            seleccionarOpcion();
            return;
        }

        rl.question('Ingrese la descripción: ', (des) => {
            if (typeof des !== 'string' || des.trim() === '') {
                console.log("La descripción debe ser un texto no vacío.");
                seleccionarOpcion();
                return;
            }

            rl.question('Ingrese la cantidad en stock: ', (cant) => {
                let cantidad = parseInt(cant.trim());
                if (isNaN(cantidad) || cantidad < 0) {
                    console.log("La cantidad en stock debe ser un número válido.");
                    seleccionarOpcion();
                    return;
                }

                rl.question('Ingrese el precio de venta: ', (precio) => {
                    let precioVenta = parseFloat(precio.trim());
                    if (isNaN(precioVenta) || precioVenta < 0) {
                        console.log("El precio de venta debe ser un número válido.");
                        seleccionarOpcion();
                        return;
                    }

                    let nuevoProducto = {
                        id: id_prod,
                        articulo: art.trim(),
                        descripcion: des.trim(),
                        cantidad_stock: cantidad,
                        precio_venta: precioVenta
                    };

                    productos.producto.push(nuevoProducto);
                    console.log("¡Producto agregado!");
                    console.log(nuevoProducto);
                    seleccionarOpcion();
                });
            });
        });
    });
}

function modificacion() {
    mostrar();
    rl.question('Ingrese el id del producto a modificar: ', (id) => {
        id = parseInt(id) - 1;

        if (id < 0 || id >= productos.producto.length || isNaN(id)) {
            console.log("ID de producto no válido.");
            seleccionarOpcion();
            return;
        }

        rl.question('Ingrese el nuevo artículo: ', (art) => {
            if (typeof art !== 'string' || art.trim() === '') {
                console.log("El artículo debe ser un texto no vacío.");
                seleccionarOpcion();
                return;
            }

            rl.question('Ingrese la nueva descripción: ', (des) => {
                if (typeof des !== 'string' || des.trim() === '') {
                    console.log("La descripción debe ser un texto no vacío.");
                    seleccionarOpcion();
                    return;
                }

                rl.question('Ingrese la nueva cantidad en stock: ', (cant) => {
                    let cantidad = parseInt(cant.trim());
                    while (isNaN(cantidad) || cantidad < 0) {
                        console.log("La cantidad en stock debe ser un número válido.");
                        seleccionarOpcion();
                        return;
                    }

                    rl.question('Ingrese el nuevo precio de venta: ', (precio) => {
                        let precioVenta = parseFloat(precio.trim());
                        if (isNaN(precioVenta) || precioVenta < 0) {
                            console.log("El precio de venta debe ser un número válido.");
                            
                        }

                        let productoModificado = {
                            id: id + 1,
                            articulo: art.trim(),
                            descripcion: des.trim(),
                            cantidad_stock: cantidad,
                            precio_venta: precioVenta
                        };

                        productos.producto[id] = productoModificado;
                        console.log("¡Producto modificado!");
                        console.log(productoModificado);
                        seleccionarOpcion();
                    });
                });
            });
        });
    });
}

function mostrar() {
    console.log("|-----|--------------------|--------------------------|-------------------|-----------------|");
    console.log("| ID  |   Artículo         |   Descripción            | Cantidad en stock | Precio de venta |");
    console.log("|-----|--------------------|--------------------------|-------------------|-----------------|");

    productos.producto.forEach(producto => {
        let id = producto.id.toString().padEnd(3, ' ');
        let articulo = producto.articulo.padEnd(18, ' ');
        let descripcion = producto.descripcion.padEnd(24, ' ');
        let cantidad = producto.cantidad_stock.padEnd(17, ' ');
        let precio = producto.precio_venta.padEnd(15, ' ');

        console.log(`| ${id} | ${articulo} | ${descripcion} | ${cantidad} | ${precio} |`);
        console.log("|-----|--------------------|--------------------------|-------------------|-----------------|");
    });
}

function seleccionarOpcion() {
    rl.question('Presione "Enter" para mostrar el menú principal: ', () => {
        console.log("\n");
        menuprincipal();
        rl.question('Elija la opción deseada: ', (input) => {
            let opcion = parseInt(input.trim());
            
            if (opcion < 0 || opcion > 3 || isNaN(opcion)) {
                console.log("\n¡OPCIÓN INCORRECTA!");
                seleccionarOpcion();
            } else {
                if (opcion === 1) {
                    alta();
                } else if (opcion === 2) {
                    modificacion();
                } else if (opcion === 3) {
                    mostrar();
                    seleccionarOpcion();
                } else if (opcion === 0) {
                    console.log("¡Hasta luego!");
                    rl.close();
                }
            }
        });
    });
}

seleccionarOpcion();
