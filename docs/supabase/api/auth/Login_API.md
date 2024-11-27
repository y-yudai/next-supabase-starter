# Login API

## Usage

```
import {supabase} from "@/utils/supabase/client"

　 supabase.auth.signInWithPassword
```

## Functionality Overview

- Authenticate with login account and password.

## Process Details

### 1. login account and password authentication

- Supabase has 【Auth】, which stores authentication information.
- The account information to be used is retrieved from 【Auth】.
- If the following conditions are met, authentication succeeds.

  ・ There is an account whose e-mail and password match.

---

## Request

### Parameter

| Column Name | Item Name | Type   | Required | Remarks |
| ----------- | --------- | ------ | -------- | ------- |
| email       | email     | string | o        |         |
| password    | password  | string | o        |         |

---

## Response

### 200 (success)

| Physical Name | Logical Name        | Type   | NotNull | Remarks |
| ------------- | ------------------- | ------ | ------- | ------- |
| session       | session information | object | o       |         |
| user          | account information | object | o       |         |

### 403 / 422 / 429 / 500 / 501 (error)

| Physical Name | Logical Name       | Type   | NotNull | Remarks                                                                        |
| ------------- | ------------------ | ------ | ------- | ------------------------------------------------------------------------------ |
| error         | processing message | string | o       | 【　https://supabase.com/docs/guides/auth/debugging/error-codes　】for details |

---

### success

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
