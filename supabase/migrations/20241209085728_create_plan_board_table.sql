CREATE TABLE plan_board (
  id SERIAL PRIMARY KEY,   -- Auto-incrementing column for AccountId
  plan_title VARCHAR(255) NOT NULL,  -- planTitle
  plan_board VARCHAR(255) NOT NULL  -- planBoard
);