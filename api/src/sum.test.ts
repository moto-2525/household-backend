import { describe, it, expect } from 'vitest'; //Vitestが提供するテスト用の関数を読み込み。describe：テストのまとまりにつけるラベル。it：具体的な「テスト内容」を書く。expect：結果がどうなるはずかを書く（テストの本体）
import { sum } from './sum'; //テストする対象（sum 関数）を読み込み

describe('sum function', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
