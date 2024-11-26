# Logout API

## Usage.

```
import {supabase} from "@/utils/supabase/client"

　 supabase.auth.signOut
```

## Functionality overview

- Destroy a session.

## Process Details

### 1. destroy session

Destroy the session information currently linked to SupaBase.
---

## Request

### Parameter

- without

---

## Response

### 200 (success)

- 無し

### 403 / 422 / 429 / 500 / 501 (error)

| Physical Name  | Logical Name     | Type      | NotNull | Remarks      |
|------|---------|--------|---------|------------------------------------|
| error |processing message | string | o       | 【　https://supabase.com/docs/guides/auth/debugging/error-codes　】for details  |

---

### success

```jsonc
```

### 403:　Sent in unusual circumstances where certain authentication features are not available to the user.

```jsonc
{
  "error": " Forbidden"
}

```

### 422: Sent when an API request has been accepted but cannot be processed because the user or authentication server is unable to fulfill the request.

```jsonc
{
  "error": " Unprocessable Entity"
}
```

### 429: Send when a speed limit is violated for the API.

```jsonc
{
  "error": "Too Many Requests"
}
```

### 500:  Server error

```jsonc
{
  "error": "Internal Server Error"
}
```

### 501: Sent when a feature is not enabled on the authentication server and you try to use an API that requires it.

```jsonc
{
  "error": "Not Implemented"
}
```