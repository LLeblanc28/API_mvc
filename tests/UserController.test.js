import request from 'supertest';
import app from '../src/app.js';

describe('UserController', () => {
    it('should return all users', async () => {
        const response = await request(app).get('/api/v1/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return a user by ID', async () => {
        const response = await request(app).get('/api/v1/users/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
    });

    it('should create a new user', async () => {
        const newUser = { name: 'John Doe', email: 'john@example.com' };
        const response = await request(app).post('/api/v1/users').send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should update an existing user', async () => {
        const updatedUser = { name: 'Jane Doe' };
        const response = await request(app).put('/api/v1/users/3').send(updatedUser);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Jane Doe');
    });

    it('should delete a user', async () => {
        const response = await request(app).delete('/api/v1/users/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ok: true });
    });
});
