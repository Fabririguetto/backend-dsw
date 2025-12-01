const bcrypt = require('bcrypt');
const { getConnection } = require('../config/db');

async function encriptarPasswords() {
    try {
        const connection = await getConnection();
        
        const passwordPlana = '123456';
        const saltRounds = 10;
        const passwordEncriptada = await bcrypt.hash(passwordPlana, saltRounds);

        //Acualizamos todos los empleados
        const query = 'UPDATE empleados SET password = ?'; 
        const [result] = await connection.execute(query, [passwordEncriptada]);

        console.log(`Se actualizaron ${result.affectedRows} empleados.`);

        connection.release();
        process.exit(); 
        
    } catch (error) {
        console.error('Error al actualizar:', error);
        process.exit(1);
    }
}

encriptarPasswords();