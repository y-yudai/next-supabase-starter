## Local Superabase Connection

1. Install node js and install a package called supbase, And add that package as a development dependency.
```bash
npm install supabase --save-dev
```
### Those who currently use this brunch ignore 2,3,4,5,6 and start with 7

2. Initial settings for working with Supabase
```bash
npx supabase init
```
3. Initial settings are all marked with 【N】
```
Generate VS Code settings for Deno? [y/N] n
Generate IntelliJ Settings for Deno? [y/N] n
Finished supabase init.
```

4. The following directories are created
- ./supabase/

5. Run Docker Desktop, If not, download from the link below
- https://www.docker.com/ja-jp/get-started/

6. In config.toml, there's the [analytics] part Modifying [enabled] to [false]
```
[analytics]
enabled = false
```

7. run npx supabase start
```bash
npx supabase start
```

8. Log check
```
Started supabase local development setup.
API URL: xxxxx
GraphQL URL: xxxxx
S3 Storage URL: xxxxx
DB URL: xxxxx
Studio URL: xxxxx
Inbucket URL: xxxxx
JWT secret: xxxxx
anon key: xxxxx
service_role key: xxxxx
S3 Access Key: xxxxx
S3 Secret Key: xxxxx
S3 Region: local
```

## Local Migrations

### Those who currently use this brunch ignore 1,2 and start with 3

1. Run the npx command to create a table .sql file
```bash
npx supabase migration new create_user_account_table  
```
2. Create a table query to create
```
Example）
CREATE TABLE user_accounts (
id SERIAL PRIMARY KEY,   -- Auto-incrementing column for AccountId
email VARCHAR(255) NOT NULL,  -- Mail
first_name VARCHAR(255) NOT NULL,  -- FirstName
last_name VARCHAR(255) NOT NULL,  -- Last_name
country_name VARCHAR(255) NOT NULL,  -- CountryName
zip VARCHAR(20) NOT NULL,  -- ZipCode
address1 VARCHAR(255) NOT NULL,  -- Address
tel VARCHAR(20) NOT NULL,  -- TelNumber
gender VARCHAR(10) NOT NULL,  -- Gender
birthday DATE NOT NULL  -- Birthday
);
```
3. Run migration
```bash
npx supabase migration up
```