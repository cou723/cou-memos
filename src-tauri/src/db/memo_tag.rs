use crate::{db, models, schema::memo_tags};
use diesel::{
    result::{DatabaseErrorKind, Error},
    *,
};

use crate::models::*;

pub fn add(conn: &SqliteConnection, memo_id: i32, tag_id: i32) -> Result<(), Error> {
    let new_post = NewMemoTags { memo_id, tag_id };

    if db::memo_tag::is_exist(conn, memo_id, tag_id)? {
        return Ok(());
    }

    let result = diesel::insert_into(memo_tags::table)
        .values(&new_post)
        .execute(conn)?;

    if result == 0 {
        Err(Error::DatabaseError(
            DatabaseErrorKind::UniqueViolation,
            Box::new("".to_string()),
        ))
    } else {
        Ok(())
    }
}

pub fn delete(conn: &SqliteConnection, memo_id: i32) -> Result<(), Error> {
    diesel::delete(memo_tags::table.filter(memo_tags::memo_id.eq(memo_id))).execute(conn)?;
    Ok(())
}

pub fn is_exist(conn: &SqliteConnection, memo_id: i32, tag_id: i32) -> Result<bool, Error> {
    match memo_tags::table
        .filter(memo_tags::memo_id.eq(memo_id))
        .filter(memo_tags::tag_id.eq(tag_id))
        .load::<models::MemoTags>(conn)
    {
        Ok(v) => return Ok(v.len() != 0),
        Err(e) => return Err(e),
    }
}
