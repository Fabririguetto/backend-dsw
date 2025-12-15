function sanitizeVentaInput(req, res, next) {
    const body = req.body;

    req.body.sanitizedInput = {
        montoTotal: body.montoTotal,
        DNIEmpleado: body.DNIEmpleado,
        idCliente: body.idCliente,
        productos: Array.isArray(body.productos)
            ? body.productos.map(p => ({
                idProducto: p.idProducto,
                cantidadVendida: p.cantidadVendida,
                subtotal: p.subtotal
            }))
            : undefined
    };

    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });

    next();
}

module.exports = sanitizeVentaInput;