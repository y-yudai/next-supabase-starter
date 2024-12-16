# Join the Member API

## Usage.

```
Import {supbase} from "@/utils/supbase/client"

　 supabase.from.insert ()
```

## Feature Overview

- insert user account information

## Process Details

### 1. Register the user account in the supabase.auth table.

- The auth table is provided by Supabase
- UserId, email, and other information are registered.
- Authentication succeeds if the following conditions are met.

· The email value to register does not exist in the table

### 2. Register the information registered in auth in the user_account table.

- UserId, email are registered as initial values.
- Authentication succeeds if the following conditions are met.

· The email value to register does not exist in the table

---

## Request

### Parameters

| Column Name | Item Name   | Type     | Required | Remarks |
|-------------|-------------|----------|----------|---------|
| ID          | AccountId   | Number   | o        |         |
| Email       | Mail        | String   | o        |         | 

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

### Success

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

### 403: Transmitted in an abnormal situation where certain authentication features are not available to the user.

```jsonc
{
"Error": "Forbidden",
}
```

### 422: Sent if the API request has been accepted, but the user or authentication server is unable to process the request and cannot process it.

```jsonc
{
"Error": "Unprocessable entity",
}
```

### 429: Send when API speed limits are violated.

```jsonc
{
"Error": "Too many requests,"
}
```

### 500: Server error

```jsonc
{
"error": "Internal server error",
}
```

### 501: Sent when the authentication server attempts to use the required API without functionality enabled.

```jsonc
{
"Error": "Not implemented",
}
```