-- Your SQL goes here
CREATE TABLE memos (
    id INTEGER NOT NULL PRIMARY KEY,
    text TEXT NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
    updatedAt TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
)