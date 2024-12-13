# ユーザー情報更新API

## 使い方

```
import {supabase} from "@/utils/supabase/client"

　 supabase.from.update()
```

## Feature Overview

- Update user account information.

## Process details

### 1. Update user account information.

- Account information table exists in the Supabase table.
- A matching ID is retrieved in an account information table and information is updated.
- If the following conditions are met, authentication is successful.

  ・ Account data exists.

---

## Request

### Parameter

| Column Name  | Item Name   | Type   | Required | Remarks |
| ------------ | ----------- |--------| -------- | ------- |
| id           | AccountId   | number | o        |         |
| email        | Mail        | string | o        |         |
| first_name   | FirstName   | string | o        |         |
| last_name    | Last_name   | string | o        |         |
| country_name | CountryName | string | o        |         |
| zip          | ZipCode     | string | o        |         |
| address1     | Address     | string | o        |         |
| tel          | TelNumber   | string | o        |         |
| gender       | Gender      | string | o        |         |
| birthday     | Birthday    | string | o        |         |

---

## Response

### 200 (success)

| Physical Name | Logical Name | Type   | NotNull | Remarks |
| ------------- | ------------ | ------ | ------- | ------- |
| count         | changeCount  | number | o       |         |

### 403 / 422 / 429 / 500 / 501 (error)

| Physical Name | Logical Name       | Type   | NotNull | Remarks                                                                        |
| ------------- | ------------------ | ------ | ------- | ------------------------------------------------------------------------------ |
| error         | processing message | string | o       | 【　https://supabase.com/docs/guides/auth/debugging/error-codes　】for details |

---

### success

```jsonc
{
  "count": xx
}
```

### 403:　Sent in unusual circumstances where certain authentication features are not available to the user.

```jsonc
{
  "error": " Forbidden",
}
```

### 422: Sent when an API request has been accepted but cannot be processed because the user or authentication server is unable to fulfill the request.

```jsonc
{
  "error": " Unprocessable Entity",
}
```

### 429: Send when a speed limit is violated for the API.

```jsonc
{
  "error": "Too Many Requests",
}
```

### 500: Server error

```jsonc
{
  "error": "Internal Server Error",
}
```

### 501: Sent when a feature is not enabled on the authentication server and you try to use an API that requires it.

```jsonc
{
  "error": "Not Implemented",
}
```
