module.exports = (req, res, next) => {
    const { dni, nombre_apellidoCli } = req.body.sanitizedInput;

    if (!dni || !nombre_apellidoCli) {
        return res.status(400).json({
            error: 'Datos inválidos o incompletos'
        });
    }

    next();
};