use serde::{Deserialize, Serialize};

use crate::models;

#[derive(Clone, Serialize, Deserialize)]
pub struct Memo {
    pub id: i32,
    pub content: String,
    pub updated_at: String,
    pub created_at: String,
    pub tags: Vec<models::Tag>,
}

impl Memo {
    pub fn from_models(memo: models::Memo, tags: Vec<models::Tag>) -> Self {
        Memo {
            id: memo.id,
            content: memo.content,
            updated_at: memo.updated_at,
            created_at: memo.created_at,
            tags,
        }
    }
}
