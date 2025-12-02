const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
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

            // ⚠️ INSEGURO: Comparar contraseña en texto plano
            // Esto solo funcionará si las contraseñas en la base de datos no están hasheadas.
            const passwordMatch = (password === user.password); 

            if (!passwordMatch) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
            }
            // // Comparar contraseña encriptada
            // const passwordMatch = await bcrypt.compare(password, user.password);
            // if (!passwordMatch) {
            //     return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
            // }

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
    async forgotPassword(req, res) {
        const { email } = req.body;
        
        try {
            // 1. Verificar si el usuario existe
            // const user = await buscarUsuarioPorEmail(email);
            // if (!user) return res.status(404).json({ error: 'Email no encontrado' });

            // 2. Generar un token temporal (puedes usar jwt o crypto)
            // const token = generarTokenTemporal(user.id);

            // 3. Enviar email al usuario con el link (ej: tudominio.com/reset/token123)
            // await enviarEmailDeRecuperacion(user.email, token);

            res.json({ message: 'Se ha enviado un correo para restablecer tu contraseña' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al procesar solicitud' });
        }
    }

    async resetPassword(req, res) {
        const { token, newPassword } = req.body;

        try {
            // 1. Verificar que el token sea válido y no haya expirado
            
            // 2. Buscar al usuario asociado a ese token
            
            // 3. Actualizar la contraseña en la BD
            // ¡IMPORTANTE! Aquí volverías a guardar 'newPassword' (sea en texto plano o hash)
            
            res.json({ message: 'Contraseña actualizada correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al cambiar contraseña' });
        }
    }
}

module.exports = new AuthController();