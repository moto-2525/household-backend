import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app'; // app.tsの書き方次第で変更

describe('GET /transactions', () => {
  it('正常系: ステータス200 & 配列が返る', async () => {
    const res = await request(app).get('/transactions');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('type');
      expect(res.body[0]).toHaveProperty('amount');
      expect(res.body[0]).toHaveProperty('memo');
    }
  });

  it('異常系: 存在しないURLは404', async () => {
    const res = await request(app).get('/notfound');
    expect(res.status).toBe(404);
  });
});
