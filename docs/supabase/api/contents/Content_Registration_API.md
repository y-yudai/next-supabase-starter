# Content Registration API

## Usage.

```
import {supabase} from "@/utils/supabase/client"

　 supabase.from.create()
```

## Functionality overview

- Add content information.

## Process details

### 1. Add the information of the contents.

- The parameter value of the request is registered in the contents table.
- If the following conditions are met, the registration succeeds.

  ・ Validation check is performed.

  ・ Sequence number is not duplicated.。

---

## Request

### Parameter

| Column Name  | Item Name | Type   | Required | Remarks |
|--------------|-----------| ------ | -------- | ------- |
| id           | 掲示板ID     | string | o        |         |
| plan_title   | 計画タイトル    | string | o        |         |
| plan_board   | 計画内容      | string | o        |         |

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
