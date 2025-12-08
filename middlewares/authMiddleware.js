const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Autenticación requerida. Token no proporcionado.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' }); 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seguro');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.rol === 'admin') {
        next(); 
    } else {
        return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de Administrador.' });
    }
};

module.exports = { verifyToken, verifyAdmin };