use serde::{Deserialize, Serialize};

use super::schema::memo_tags;
use super::schema::memos;
use super::schema::tags;

#[derive(Queryable, Clone, Serialize, Deserialize)]
pub struct Memo {
    pub id: i32,
    pub content: String,
    pub updated_at: String,
    pub created_at: String,
}

#[derive(Insertable)]
#[table_name = "memos"]
pub struct NewMemo<'a> {
    pub content: &'a str,
}

#[derive(Queryable, Clone, Serialize, Deserialize)]
pub struct Tag {
    pub id: i32,
    pub content: String,
    pub created_at: String,
}

#[derive(Insertable)]
#[table_name = "tags"]
pub struct NewTag<'a> {
    pub content: &'a str,
}

#[derive(Queryable, Clone, Serialize, Deserialize)]

pub struct MemoTags {
    pub memo_id: i32,
    pub tag_id: i32,
}

#[derive(Insertable)]
#[table_name = "memo_tags"]
pub struct NewMemoTags {
    pub memo_id: i32,
    pub tag_id: i32,
}
