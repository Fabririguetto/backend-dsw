function validateVentaInput(req, res, next) {
    const { montoTotal, DNIEmpleado, idCliente, productos } = req.body.sanitizedInput;

    if (!montoTotal || !DNIEmpleado || !idCliente) {
        return res.status(400).json({ error: 'Datos principales de la venta incompletos' });
    }

    if (isNaN(Number(montoTotal))) {
        return res.status(400).json({ error: 'El monto total debe ser numérico' });
    }

    if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: 'La venta debe tener al menos un producto' });
    }

    for (const p of productos) {
        if (!p.idProducto || !p.cantidadVendida || !p.subtotal) {
            return res.status(400).json({ error: 'Producto de la venta inválido' });
        }

        if (
            isNaN(Number(p.cantidadVendida)) ||
            isNaN(Number(p.subtotal))
        ) {
            return res.status(400).json({ error: 'Cantidad y subtotal deben ser numéricos' });
        }
    }

    next();
}

module.exports = validateVentaInput;