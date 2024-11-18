# ログアウトAPI

```properties
[post] https://<supabase-project>.supabase.co/auth/v1/logout
```

## 機能概要

- セッションを破棄する

## 処理詳細

### 1. セッションを破棄する

現在SupaBaseに連携されているセッション情報を破棄する。
---

## リクエスト

### PathParameter

- 無し

### QueryString

- 無し

### RequestBody

- 無し

---

## レスポンス

### 200 (正常)

- 無し


### 403 / 422 / 429 / 500 / 501 (エラー)

| 物理名  | 論理名     | 型      | NotNull | 備考                                                                   |
|------|---------|--------|---------|----------------------------------------------------------------------|
| error | 処理メッセージ | string | o       | 詳細は【　https://supabase.com/docs/guides/auth/debugging/error-codes　】参照 |

---

## 動作例

```bash
curl -v -X POST https://<supabase-project>.supabase.co/auth/v1/token \
  -H "Content-Type: application/json" \
```

### 正常

```jsonc
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