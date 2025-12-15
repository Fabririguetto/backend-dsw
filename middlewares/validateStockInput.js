module.exports = (req, res, next) => {
    const { articulo, descripcion, cantidad, monto } = req.body.sanitizedInput;

    if (req.method === 'POST') {
        if (!articulo || !descripcion || cantidad === undefined || monto === undefined) {
            return res.status(400).json({ error: 'Datos incompletos para crear producto' });
        }
    }

    if (cantidad !== undefined && isNaN(Number(cantidad))) {
        return res.status(400).json({ error: 'Cantidad debe ser numérica' });
    }

    if (monto !== undefined && isNaN(Number(monto))) {
        return res.status(400).json({ error: 'Monto debe ser numérico' });
    }

    next();
};