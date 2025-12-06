const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return next(); 
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado' });
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
        next(); 
    }
};

module.exports = { verifyToken, verifyAdmin };