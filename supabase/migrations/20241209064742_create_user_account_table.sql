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
