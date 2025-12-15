const request = require('supertest');
const { app } = require('../index'); 

let adminToken = '';
let nonAdminToken = ''; 

// Datos para tests de PUT
const stockIdToUpdate = 1; 
const stockUpdateData = {
    cantidad: 75, 
    sucursalId: 1, 
    productId: 1 
};
const invalidStockUpdateData = {
    cantidad: "setenta y cinco", 
    sucursalId: 1, 
    productId: 1
};

const newStockData = {
    articulo: 'Monitor Gaming 27"',
    descripcion: 'Monitor Curvo 144hz',
    cantidad: 30,
    monto: 399.99
};

const incompleteStockData = {
    articulo: 'Monitor Incompleto',
    descripcion: 'Falta la cantidad y el monto',
};

const invalidTypeStockData = {
    articulo: 'Producto Inválido',
    descripcion: 'Cantidad con string',
    cantidad: 'treinta', 
    monto: 399.99
};


beforeAll(async () => {
    console.log("-> Iniciando obtención de tokens para tests de Stock...");
    
    const adminLoginResponse = await request(app)
        .post('/auth/login')
        .send({
            email: 'martin.redaelli@hotmail.com', 
            password: '123456'
        });

    if (adminLoginResponse.statusCode === 200 && adminLoginResponse.body.token) {
        adminToken = adminLoginResponse.body.token;
        console.log("-> Token de Admin obtenido.");
    } else {
        throw new Error("ERROR: No se pudo obtener el token de Administrador. Revise la ruta /auth/login.");
    }

    const nonAdminLoginResponse = await request(app)
        .post('/auth/login')
        .send({
            email: 'user12312312@test.com', 
            password: '123456'     
        });
    
    if (nonAdminLoginResponse.statusCode === 200 && nonAdminLoginResponse.body.token) {
        nonAdminToken = nonAdminLoginResponse.body.token; 
        console.log("-> Token de No-Admin (Empleado) obtenido.");
    } else {
        console.warn("ADVERTENCIA: No se pudo obtener el token de No-Admin. Test de 403 podría fallar. Status:", nonAdminLoginResponse.statusCode);
    }
});


describe('🚀 Test de Integración: Autorización de Actualización y Creación de Stock (/stock)', () => {


    // Test de autorizacion

    test('1. PUT /stock/:id debe ser exitoso (200/204) si el usuario es Admin', async () => {
        const response = await request(app)
            .put(`/stock/${stockIdToUpdate}`) 
            .set('Authorization', `Bearer ${adminToken}`) 
            .send(stockUpdateData);

        const expectedStatusCodes = [200, 204];
        
        expect(expectedStatusCodes).toContain(response.statusCode);
    });
    
    test('2. PUT /stock/:id debe fallar con 403 (Prohibido) si el usuario NO es Admin', async () => {
        if (!nonAdminToken) {
            console.warn("Saltando Test 2: No se pudo obtener el token de No-Admin.");
            return;
        }

        const response = await request(app)
            .put(`/stock/${stockIdToUpdate}`) 
            .set('Authorization', `Bearer ${nonAdminToken}`)
            .send(stockUpdateData);

        expect(response.statusCode).toBe(403); 
        expect(response.body).toHaveProperty('error');
    });
    
    test('3. PUT /stock/:id debe fallar con 401 (No Autorizado) si no se envía ningún token', async () => {
        const response = await request(app)
            .put(`/stock/${stockIdToUpdate}`) 
            .send(stockUpdateData);

        expect(response.statusCode).toBe(401); 
        expect(response.body).toHaveProperty('error');
    });

    test('4. PUT /stock/:id debe fallar con 400 (Bad Request) con datos inválidos (siendo Admin)', async () => {
        const response = await request(app)
            .put(`/stock/${stockIdToUpdate}`) 
            .set('Authorization', `Bearer ${adminToken}`) 
            .send(invalidStockUpdateData); 

        expect(response.statusCode).toBe(400); 
        expect(response.body).toHaveProperty('error');
    });

    test('5. POST /stock debe ser exitoso (201 Created) si el usuario es Admin', async () => {
        const response = await request(app)
            .post('/stock')
            .set('Authorization', `Bearer ${adminToken}`) 
            .send(newStockData);

        expect(response.statusCode).toBe(201); 
        expect(response.body).toHaveProperty('message', 'Producto creado'); 
    });

    test('6. POST /stock debe fallar con 403 (Prohibido) si el usuario NO es Admin', async () => {
        if (!nonAdminToken) {
            console.warn("Saltando Test 6: No se pudo obtener el token de No-Admin.");
            return;
        }

        const response = await request(app)
            .post('/stock')
            .set('Authorization', `Bearer ${nonAdminToken}`) 
            .send(newStockData);

        expect(response.statusCode).toBe(403); 
        expect(response.body).toHaveProperty('error');
    });

    test('7. POST /stock debe fallar con 401 (No Autorizado) si no se envía ningún token', async () => {
        const response = await request(app)
            .post('/stock')
            .send(newStockData);

        expect(response.statusCode).toBe(401); 
        expect(response.body).toHaveProperty('error');
    });
    
    test('8. POST /stock debe fallar con 400 (Bad Request) con datos incompletos (siendo Admin)', async () => {
        const response = await request(app)
            .post('/stock')
            .set('Authorization', `Bearer ${adminToken}`) 
            .send(incompleteStockData);

        expect(response.statusCode).toBe(400); 
        expect(response.body).toHaveProperty('error', 'Datos incompletos para crear producto'); 
    });

    test('9. POST /stock debe fallar con 400 (Bad Request) con tipos de datos inválidos (siendo Admin)', async () => {
        const response = await request(app)
            .post('/stock')
            .set('Authorization', `Bearer ${adminToken}`) 
            .send(invalidTypeStockData);

        expect(response.statusCode).toBe(400); 
        expect(response.body).toHaveProperty('error');
    });

});
