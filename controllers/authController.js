const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getConnection } = require('../config/db');

class AuthController {

    async login(req, res) {
        const { email, password } = req.body;

        // Validaciones iniciales
        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
        }

        // Validación mínima de email
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ error: 'Email inválido.' });
        }

        let connection;
        try {
            connection = await getConnection();

            // Buscar usuario por email
            const [rows] = await connection.execute(
                'SELECT * FROM empleados WHERE email = ? LIMIT 1',
                [email]
            );

            if (rows.length === 0) {
                return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
            }

            const user = rows[0];

            // if (!passwordMatch) {
            // return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
            // }
            // Comparar contraseña encriptada
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
            }

            // Crear token JWT
            const token = jwt.sign(
                {
                    dni: user.DNI_CUIL,
                    rol: user.rol,
                    nombre: user.nombre_apellidoEmp,
                },
                process.env.JWT_SECRET || 'secreto_super_seguro',
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
            // Liberar la conexión SIEMPRE
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
        // 1. Encriptar la nueva contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // 2. Conectar y Actualizar Directamente
        connection = await getConnection(); // Tu función de conexión
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