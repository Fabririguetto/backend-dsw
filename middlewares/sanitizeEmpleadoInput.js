function sanitizeEmpleadoInput(req, res, next) {
    req.body.sanitizedInput = {
        DNI_CUIL: req.body.DNI_CUIL,
        nombre_apellidoEmp: req.body.nombre_apellidoEmp,
        contacto: req.body.contacto,
        sucursal: req.body.sucursal,
        email: req.body.email,
        password: req.body.password,
        rol: req.body.rol
    };

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });

    next();
}

module.exports = sanitizeEmpleadoInput;