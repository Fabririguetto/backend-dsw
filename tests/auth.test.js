const request = require('supertest');
const express = require('express');

describe('Tests Básicos de Autenticación', () => {
let app;

// Creamos una app express de prueba
beforeAll(() => {
    app = express();
    app.use(express.json());
    

    app.post('/auth/login', (req, res) => {
        console.log('🔄 Ruta /auth/login simulada para test');
        const { email, password } = req.body;

    // Validación basica
        if (!email || !password) {
        return res.status(400).json({
            error: 'Email y contraseña son obligatorios',
            code: 'VALIDATION_ERROR'
        });
    }

    // Credenciales de prueba
    if (email === 'admin@test.com' && password === 'admin123') {
        return res.status(200).json({
            token: 'jwt-test-token-12345',
            user: {
            id: 1,
            email: 'admin@test.com',
            rol: 'admin',
            nombre: 'Administrador Test'
        }
        });
    }

    // Credenciales incorrectas
    return res.status(401).json({
        error: 'Credenciales inválidas',
        code: 'AUTH_ERROR'
        });
    });
});

// Primer Test
test('1. POST /auth/login debe aceptar credenciales válidas', async () => {
    const response = await request(app)
        .post('/auth/login')
        .send({
        email: 'admin@test.com',
        password: 'admin123'
    });
    
    console.log('Test 1 - Status:', response.statusCode);
    console.log('Test 1 - Respuesta:', JSON.stringify(response.body));
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.rol).toBe('admin');
});

// Segundo Test
test('2. POST /auth/login debe rechazar campos vacíos', async () => {
    const response = await request(app)
        .post('/auth/login')
        .send({
            email: '',
            password: 'contraseña'
        });

    console.log('Test 2 - Status:', response.statusCode);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
});
});