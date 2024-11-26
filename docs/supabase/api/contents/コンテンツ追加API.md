# ユーザー情報更新API

## 使い方

```
import {supabase} from "@/utils/supabase/client"

　 supabase.from.update()
```

## 機能概要

- コンテンツの情報の追加を行う。

## 処理詳細

### 1. コンテンツの情報の追加を行う。

- Supabaseのテーブルでコンテンツテーブルが存在する。
- リクエストのパラメター値をコンテンツテーブルにデータを登録する。
- 下記条件を満たした場合、登録に成功する。

- バリデーションチェックを行う。
- シーケンス番号が重複にならない。
---

## リクエスト

### Parameter

| 物理名          | 項目名      | 型     | 必須 | 備考     |
|--------------|----------| ------| ----|-----------|
| id           | アカウントID  | string | o    |           |
| email        | メール      | string | o    |           |
| first_name   | 名前       | string | o     |         |
| last_name    | 名字       | string | o     |         |
| country_name | 国名       | string | o     |         |
| zip          | 郵便番号     | string | o     |         |
| address1     | 住所1      | string | o     |         |
| address2     | 住所2      | string | o     |         |
| address3     | 住所3      | string | o     |         |
| address4     | 住所4      | string | o     |         |
| address5     | 住所5      | string | o     |         |
| tel          | 電話番号     | string | o     |         |
| gender       | 性別       | string | o     |         |
| birthday     | 生年月日     | string | o     |         |
| nick_name    | ニックネーム   | string | o     |         |
| image        | プロフィール写真 | string | o     |         |
| self_comment | 自己紹介     | string | o     |         |

---

## レスポンス

### 200 (正常)

| 物理名   | 論理名     | 型      | NotNull | 備考                 |
|-------|---------|--------|---------|--------------------|
| count | 変更数     | number | o       |                    |


### 403 / 422 / 429 / 500 / 501 (エラー)

| 物理名  | 論理名     | 型      | NotNull | 備考                                 |
|------|---------|--------|---------|------------------------------------|
| error | 処理メッセージ | string | o       | 詳細は【　https://supabase.com/docs/guides/auth/debugging/error-codes　】参照 |

---

### 正常

```jsonc
{
  "count":　xx
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