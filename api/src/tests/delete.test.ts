import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../app';
import { prisma } from '../context/prisma';

let transactionId: number; // テストで使用するトランザクションID

describe('DElETE /transactions/:id', () => {
  beforeEach(async () => {
    await prisma.transaction.deleteMany(); // テーブルを空にする

    // 新しいトランザクションを追加して取得
    const mockTransaction = await prisma.transaction.create({
      data: {
        date: new Date('2025-01-01'),
        type: 'expense',
        amount: 2500,
        memo: '本',
      },
    });

    transactionId = mockTransaction.id; // 追加したトランザクションのIDを保存
  });

  it('should delete a transaction by id', async () => {
    const response = await request(app).delete(`/transactions/${transactionId}`); // DELETEリクエスト

    expect(response.status).toBe(204); // ステータスコード204（削除成功）を期待
  });

  it('should not find the deleted transaction', async () => {
    //まず削除
    await request(app).delete(`/transactions/${transactionId}`);
    //削除後にGET
    const getResponse = await request(app).get(`/transactions/${transactionId}`);

    expect(getResponse.status).toBe(404); // ステータスコード404（見つからない）を期待
    expect(getResponse.body).toHaveProperty('error', 'transaction not found'); // エラーメッセージを確認
  });

  it('should return 404 for non-existent transaction', async () => {
    //存在しないIDを使ってDELETEを試みることで、エラーハンドリングを確認
    const nonExistentId = 999999; // 存在しないID

    const response = await request(app).delete(`/transactions/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'transaction not found');
  });
});
