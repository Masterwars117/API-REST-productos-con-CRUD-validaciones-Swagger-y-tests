const request = require('supertest');
const app = require('../app'); // OJO: no levanta server ni DB aquí

describe('Healthcheck', () => {
  test('GET /health responde ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
