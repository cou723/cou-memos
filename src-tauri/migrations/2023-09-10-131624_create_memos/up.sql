-- Your SQL goes here
CREATE TABLE memos (
    id INTEGER NOT NULL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
    updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);
CREATE TABLE tags (
    id INTEGER NOT NULL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);
CREATE TABLE memo_tags (
    memo_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (memo_id, tag_id),
    FOREIGN KEY (memo_id) REFERENCES memos (id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
)