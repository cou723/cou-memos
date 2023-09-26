use crate::db::last_insert_rowid;
use crate::models;
use crate::models::{NewTag, Tag};
use crate::schema::memo_tags;
use crate::schema::tags;
use crate::Error;
use diesel::prelude::*;

pub fn get_list(conn: &SqliteConnection, memo_id: &i32) -> Result<Vec<Tag>, Error> {
    let memo_tags = memo_tags::table
        .filter(memo_tags::memo_id.eq(memo_id))
        .load::<models::MemoTag>(conn)
        .map_err(|_| Error::DbInvalidArgs)?;

    let mut tags = Vec::new();

    for memo_tag in memo_tags {
        tags.push(
            tags::table
                .find(memo_tag.tag_id)
                .get_result(conn)
                .map_err(|_| Error::DbInvalidArgs)?,
        );
    }

    Ok(tags)
}

pub fn get(conn: &SqliteConnection, tag: &str) -> Result<i32, Error> {
    let results = tags::table
        .filter(tags::content.eq(tag))
        .load::<models::Tag>(conn)
        .map_err(|_| Error::DbInvalidArgs)?;

    Ok(if results.len() == 0 {
        let new_post = NewTag { content: tag };

        diesel::insert_into(tags::table)
            .values(&new_post)
            .execute(conn)
            .map_err(|_| Error::DbInvalidArgs)?;

        diesel::select(last_insert_rowid)
            .get_result::<i32>(conn)
            .map_err(|_| Error::DbInvalidArgs)?
    } else {
        results[0].id
    })
}
