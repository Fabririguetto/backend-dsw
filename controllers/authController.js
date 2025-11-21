const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getConnection } = require('../config/db');

class AuthController {

    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
        }

        try {
            const connection = await getConnection();

            
            const [users] = await connection.execute(
                'SELECT * FROM empleados WHERE email = ?', 
                [email]
            );
            connection.release();

            if (users.length === 0) {
                return res.status(401).json({ error: 'Usuario no encontrado' });
            }

            const user = users[0];

            
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }

            
            const token = jwt.sign(
                { 
                    dni: user.DNI_CUIL,
                    rol: user.rol,
                    nombre: user.nombre_apellidoEmp 
                },
                process.env.JWT_SECRET || 'secreto_super_seguro',
                { expiresIn: '8h' }
            );

            
            res.json({
                message: 'Login exitoso',
                token,
                user: {
                    dni: user.DNI_CUIL,
                    nombre: user.nombre_apellidoEmp,
                    rol: user.rol,
                    sucursal: user.idSucursal
                }
            });

        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = new AuthController();