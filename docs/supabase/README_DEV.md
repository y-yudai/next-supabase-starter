## Superabase Connection

1. Install node js and install a package called supbase, And add that package as a development dependency.
```bash
npm install supabase --save-dev
```
### Those who currently use this brunch ignore 2,3,4 and start with 5

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

5. Connect to the superbase.
```bash
npx supabase login
```

6. After accessing the suppbase as below, log in with git and get the authentication key. 
```
Hello from Supabase! Press Enter to open browser and login automatically.
Here is your login link in case browser did not open https://supabase.com/dashboard/cli/login?session_id=xxxxxxx
Enter your verification code: xxxxx
```
- If successful, the phrase below appears
    - Token cli_WEBCREW_JPN\youngjae.won@WL-017_1733796672 created successfully.
    - You are now logged in. Happy coding!

7. Run a cooperation with the superbase
```bash
npx supabase link
```
```
Select a project:
>  1. xxxxxx
>  2. xxxxxx
↑/k up • ↓/j down • / filter • q quit • ? more
```

8. Enter the password for the database.
```
Enter your database password (or leave blank to skip):
Connecting to remote database...
Finished supabase link.
```
- If successful, The contents of supabase\config.toml are displayed

## Migrations

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
npx supabase db push
```
```
Connecting to remote database...
Do you want to push these migrations to the remote database?
• 20241209064742_create_user_account_table.sql
• 20241209085728_create_plan_board_table.sql
[Y/n] Y
```
- If successful, the phrase below appears
```
Applying migration 20241209064742_create_user_account_table.sql...
Applying migration 20241209085728_create_plan_board_table.sql...
Finished supabase db push.
```