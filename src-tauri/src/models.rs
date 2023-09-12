use serde::{Deserialize, Serialize};

use super::schema::memos;

#[derive(Queryable, Clone, Serialize, Deserialize)]
pub struct Memo {
    pub id: i32,
    pub text: String,
    pub updated_at: String,
    pub created_at: String,
}

#[derive(Insertable)]
#[table_name = "memos"]
pub struct NewMemo<'a> {
    pub text: &'a str,
}
