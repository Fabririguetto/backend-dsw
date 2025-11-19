const bcrypt = require('bcrypt');
const { getConnection } = require('../config/db');

async function encriptarPasswords() {
    console.log('🔒 Probando conexión y buscando Admin...');
    
    try {
        const connection = await getConnection();
        
        // 1. Verificamos si existe la tabla empleados
        const [users] = await connection.execute("SELECT * FROM empleados WHERE rol = 'admin'");
         
        if (users.length === 0) {
            console.log('❌ ERROR: La base de datos existe, pero NO encuentro al usuario Admin.');
            console.log('   -> Solución: Ejecutá el script SQL de creación de tablas nuevamente.');
            process.exit(1);
        }

        console.log('✅ Usuario Admin encontrado. Procediendo a encriptar contraseña...');

        // 2. Encriptar la contraseña '123456'
        const passwordPlana = '123456';
        const saltRounds = 10;
        const passwordEncriptada = await bcrypt.hash(passwordPlana, saltRounds);
        
        // 3. Actualizar en la DB
        const query = 'UPDATE empleados SET password = ? WHERE rol = ?';
        await connection.execute(query, [passwordEncriptada, 'admin']);

        console.log('✅ ¡ÉXITO TOTAL! Base de datos conectada, tablas encontradas y seguridad aplicada.');
        console.log('   -> Ya podés avanzar con el Login.');

        connection.release();
        process.exit(); 
        
    } catch (error) {
        console.error('❌ Error grave:', error.message);
        if (error.code === 'ER_NO_SUCH_TABLE') {
            console.log('   -> Tu base de datos está vacía (no tiene tablas).');
        }
        process.exit(1);
    }
}

encriptarPasswords();