# 家計簿アプリ（household-backend）

## 概要

家計簿アプリのバックエンド API です。  
入出金データ（収入・支出）の管理および、収支の集計情報を提供します。

フロントエンド（Next.js）からのリクエストを受け取り、  
データベースと連携して CRUD 処理・集計処理を行います。

---

## 使用技術

- Node.js
- Express
- TypeScript
- Prisma
- MySQL
- Docker（開発環境）

---

## 提供 API 一覧

#### 入出金（Transaction）

| 目的     | メソッド | URL               |
| -------- | -------- | ----------------- |
| 一覧取得 | GET      | /transactions     |
| 新規追加 | POST     | /transactions     |
| 削除     | DELETE   | /transactions/:id |

### 集計（Summary）

| 目的         | メソッド | URL      |
| ------------ | -------- | -------- |
| 収支集計取得 | GET      | /summary |

---

### **1. GET /transactions**

**目的**：入出金一覧を取得する

**ステータスコード：**

- **200 OK**：一覧取得に成功
- **500 Internal Server Error**：サーバーエラー

**リクエスト**：なし

**レスポンス（例）**：

[
{
"id": "1",
"date": "2025-11-01",
"type": "収入",
"amount": 50000,
"memo": "給与"
},
{
"id": "2",
"date": "2025-11-02",
"type": "支出",
"amount": 1200,
"memo": "ランチ"
}
]

レスポンスデータ形式：

[
{
"id": string, // 自動生成されたID
"date": string, // YYYY-MM-DD
"type": string, // "収入" または "支出"
"amount": number, // 整数
"memo": string // 任意
},
...
]

### **2. POST /transactions**

**目的**：新しい入出金データを登録する

**ステータスコード**

- **201 Created**：新規登録成功
- **400 Bad Request**：リクエストの形式が不正（例：amountが数字ではない）
- **500 Internal Server Error**：サーバーエラー

 **リクエストヘッダー：**

Content-Type: application/json

**リクエスト（例）**：

{
"date": "2025-11-13",
"type": "支出",
"amount": 300,
"memo": "あめ"
}

**リクエストの入力ルール**

**date（必須）**：YYYY-MM-DD の形式

**type（必須）**： "収入" または "支出"

**amount（必須）**：数値（整数）

**memo（任意）**：文字列

**レスポンス（例）**：

{
"id": "48ca",
"date": "2025-11-13",
"type": "支出",
"amount": 300,
"memo": "あめ"
}

※ ID はサーバー側で自動生成される前提

**エラーレスポンス（例）：**

400 Bad Request
{
"error": "amount must be a number"
}

404 Not Found
{
"error": "transaction not found"
}

500 Internal Server Error
{
"error": "server error"
}

### **3. DELETE /transactions/:id**

**目的**：指定した入出金データを削除する

**ステータスコード**

- **200 OK：削除成功**
- **404 Not Found：対象データが存在しない**
- **500 Internal Server Error**：サーバーエラー

## **集計表（Summary）**

### **● 機能**

- 収入合計
- 支出合計
- 収支差額

| 目的         | **メソッド** | **URL**  |
| ------------ | ------------ | -------- |
| 収支差額取得 | GET          | /summary |

### **4. GET /summary**

**目的**：収入・支出の合計を返す

**ステータスコード**

- **200 OK**：集計取得に成功
- **500 Internal Server Error**：サーバーエラー

**レスポンス（例）**：

{
"income": 50000,
"expense": 5250,
"balance": 44750
}

**レスポンスデータ形式：**

{
"income": number, // 収入の合計
"expense": number, // 支出の合計
"balance": number // 収支差額
}

**計算ルール**

**income（収入合計）**：type が "収入" の amount の総和

**expense（支出合計）**：type が "支出" の amount の総和

**balance（収支差額）**：income - expense
