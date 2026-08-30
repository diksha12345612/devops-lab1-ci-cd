const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  it('should return welcome message with status 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain('Welcome');
  });
});

describe('GET /about', () => {
  it('should return project info with status 200', async () => {
    const res = await request(app).get('/about');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.project).toBe('DevOps Lab 1');
    expect(res.body.stack).toContain('Docker');
  });
});

describe('GET /health', () => {
  it('should return healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.status).toBe('healthy');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('timestamp');
  });
});

describe('GET /unknown-route', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/this-route-does-not-exist');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Route not found');
  });
});
