const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getConnection } = require('../config/db');

class AuthController {

    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ error: 'Email inválido.' });
        }

        let connection;
        try {
            connection = await getConnection();

            const [rows] = await connection.execute(
                'SELECT emp.*, r.rol FROM empleados AS emp INNER JOIN rol AS r ON r.idrol = emp.idrol WHERE email = ? LIMIT 1',
                [email]
            );

            if (rows.length === 0) {
                return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
            }

            const user = rows[0];

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
            }

            const token = jwt.sign(
                {
                    dni: user.DNI_CUIL,
                    rol: user.rol,
                    nombre: user.nombre_apellidoEmp,
                },
                process.env.JWT_SECRET || '550e8400-e29b-41d4-a716-446655440000',
                { expiresIn: '8h' }
            );

            return res.json({
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
            return res.status(500).json({ error: 'Error interno del servidor.' });
        } finally {
            if (connection) connection.release();
        }
    }
   async directResetPassword(req, res) {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ error: 'Faltan datos: email o nueva contraseña' });
    }

    let connection;
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        connection = await getConnection();
        const [result] = await connection.execute(
            'UPDATE empleados SET password = ? WHERE email = ?',
            [hashedPassword, email]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'No existe un usuario con ese email.' });
        }

        res.json({ message: 'Contraseña actualizada y encriptada correctamente.' });

    } catch (error) {
        console.error('Error en reset password:', error);
        res.status(500).json({ error: 'Error al actualizar la contraseña.' });
    } finally {
        if (connection) connection.release();
    }
}
}

module.exports = new AuthController();