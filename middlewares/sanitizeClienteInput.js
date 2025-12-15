module.exports = (req, res, next) => {
    req.body.sanitizedInput = {
        dni: req.body.dni,
        nombre_apellidoCli: req.body.nombre_apellidoCli,
        contacto: req.body.contacto,
        email: req.body.email
    };

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (
            req.body.sanitizedInput[key] === undefined ||
            req.body.sanitizedInput[key] === null ||
            req.body.sanitizedInput[key] === ''
        ) {
            delete req.body.sanitizedInput[key];
        }
    });

    next();
};