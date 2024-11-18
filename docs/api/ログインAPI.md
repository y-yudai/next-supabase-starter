# ログインAPI

```properties
[post] https://<supabase-project>.supabase.co/auth/v1/token
```

## 機能概要

- ログインアカウントとパスワードで認証を行う
- 

## 処理詳細

### 1. ログインアカウント・パスワード認証

SupaBaseには認証情報を格納する【Auth】が存在する。
【Auth】から利用するアカウント情報を検索する。
下記条件を満たした場合、認証に成功する。

- メールとパスワードが一致するアカウントが存在する。
- 
---

## リクエスト

### PathParameter

- 無し

### QueryString

- 無し

### RequestBody

| 物理名      | 項目名   | 型     | 必須 | 備考     |
|----------|-------| ------| ----|-----------|
| email    | メール   | string | o    |           |
| password | パスワード | string | o     |         |

---

## レスポンス

### 200 (正常)

| 物理名       | 論理名     | 型      | NotNull | 備考                 |
|-----------|---------|--------|---------|--------------------|
| session   | セッション情報 | オブジェクト | o       |                    |
| user      | アカウント情報 | オブジェクト   | o       |                    |


### 403 / 422 / 429 / 500 / 501 (エラー)

| 物理名  | 論理名     | 型      | NotNull | 備考                                 |
|------|---------|--------|---------|------------------------------------|
| error | 処理メッセージ | string | o       | 詳細は【　https://supabase.com/docs/guides/auth/debugging/error-codes　】参照 |

---

## 動作例

```bash
curl -v -X POST https://<supabase-project>.supabase.co/auth/v1/token \
  -H "Content-Type: application/json" \
  -d '{ "email": "test", "password": "test" }'
```

### 正常

```jsonc
{
  "session": {
    provider_token:xxxxx,
    access_token:xxxxx,
    ・・・
  },
  "user": {
    id: xxxx,
    email:xxxxx@xxxx.co.jp
    ・・・
  }
}
```

### 403:　特定の認証機能をユーザーが使用できない珍しい状況で送信

```jsonc
{
  "error": " Forbidden"
}

```

### 422: API要求は受け入れられましたが、ユーザーまたは認証サーバーが要求を満たすことができない状態で処理できない場合に送信

```jsonc
{
  "error": " Unprocessable Entity"
}
```

### 429: APIに対する速度制限が違反した場合に送信

```jsonc
{
  "error": "Too Many Requests"
}
```

### 500: サーバーエラー

```jsonc
{
  "error": "Internal Server Error"
}
```

### 501: 認証サーバで機能が有効になっておらず、その機能が必要なAPIを使用しようとしたときに送信

```jsonc
{
  "error": "Not Implemented"
}
```