module.exports = (req, res, next) => {
    req.body.sanitizedInput = {
        articulo: req.body.articulo,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad,
        monto: req.body.monto,
        estado: req.body.estado
    };

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (
            req.body.sanitizedInput[key] === undefined ||
            req.body.sanitizedInput[key] === null
        ) {
            delete req.body.sanitizedInput[key];
        }
    });

    next();
};