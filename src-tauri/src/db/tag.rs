use crate::db::last_insert_rowid;
use crate::models;
use crate::models::{NewTag, Tag};
use crate::schema::memo_tags;
use crate::schema::tags;
use diesel::prelude::*;
use diesel::result::Error;

pub fn get_list(conn: &SqliteConnection, memo_id: i32) -> Result<Vec<Tag>, Error> {
    let memo_tags = memo_tags::table
        .filter(memo_tags::memo_id.eq(memo_id))
        .load::<models::MemoTags>(conn)?;

    let mut tags = Vec::new();

    for memo_tag in memo_tags {
        tags.push(tags::table.find(memo_tag.tag_id).get_result(conn)?);
    }

    Ok(tags)
}

pub fn get(conn: &SqliteConnection, tag: &str) -> Result<i32, Error> {
    let results = tags::table
        .filter(tags::content.eq(tag))
        .load::<models::Tag>(conn)
        .expect("Error loading posts");

    Ok(if results.len() == 0 {
        let new_post = NewTag { content: tag };

        diesel::insert_into(tags::table)
            .values(&new_post)
            .execute(conn)?;
        diesel::select(last_insert_rowid).get_result::<i32>(conn)?
    } else {
        results[0].id
    })
}
