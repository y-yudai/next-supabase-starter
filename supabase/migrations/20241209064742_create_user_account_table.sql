CREATE TABLE user_accounts (
  id SERIAL PRIMARY KEY,   -- Auto-incrementing column for AccountId
  auth_id UUID NOT NULL, -- AuthId (references auth.users)
  email VARCHAR(255) NOT NULL,  -- Mail
  first_name VARCHAR(255),  -- FirstName
  last_name VARCHAR(255),  -- LastName
  country_name VARCHAR(255),  -- CountryName
  zip VARCHAR(20),  -- ZipCode
  address1 VARCHAR(255),  -- Address
  tel VARCHAR(20),  -- TelNumber
  gender VARCHAR(10),  -- Gender
  birthday DATE,  -- Birthday
  CONSTRAINT fk_auth_id FOREIGN KEY (auth_id) REFERENCES auth.users (id) ON DELETE CASCADE
);
