import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
  },
});

// テスト環境の .env.test を読み込む
dotenv.config({ path: '.env.test' });
