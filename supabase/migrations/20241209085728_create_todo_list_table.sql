CREATE TABLE todo_lists (
  id SERIAL PRIMARY KEY,   -- Auto-incrementing column for AccountId
  title VARCHAR(255) NOT NULL,  -- Title
  finished BOOLEAN NOT NULL  -- finished
);