DROP TABLE IF EXISTS todos;

CREATE TABLE IF NOT EXISTS todos
(
    id           SERIAL PRIMARY KEY NOT NULL UNIQUE,
    title        VARCHAR(255)       NOT NULL,
    description  VARCHAR(4096)      NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    created_at   DATE               NOT NULL,
    "timestamp"  NUMERIC            NOT NULL
    );

TRUNCATE TABLE todos;