-- Create the Categories table
CREATE TABLE Categories
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create the Users table
CREATE TABLE Users
(
    id         SERIAL PRIMARY KEY,
    username   VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    role       int          NOT NULL DEFAULT 1,
    created_at TIMESTAMP             DEFAULT NOW(),
    updated_at TIMESTAMP             DEFAULT NOW()
);

-- Create the Articles table
CREATE TABLE Articles
(
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    content     TEXT,
    author      VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES Categories (id),
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at  TIMESTAMP DEFAULT NOW(),
    thumbnail   varchar
);

-- Create the Comments table
CREATE TABLE Comments
(
    id         SERIAL PRIMARY KEY,
    content    TEXT,
    user_id    INTEGER REFERENCES Users (id),
    article_id INTEGER REFERENCES Articles (id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


insert into users (id, username, email, password, role, created_at, updated_at)
values (1, 'braindata', 'admin@braindata.com', 'braindata', 0, '2023-05-08 15:58:28.816499',
        '2023-05-08 15:58:28.816499');


insert into categories (id, name, description)
values (1, 'News', 'News');



