CREATE TABLE todo_lists (
  id SERIAL PRIMARY KEY,   -- Auto-incrementing column for AccountId
  user_id INT NOT NULL, -- UserId
  title VARCHAR(255) NOT NULL,  -- Title
  finished BOOLEAN NOT NULL,  -- finished
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_accounts (id) ON DELETE CASCADE
);