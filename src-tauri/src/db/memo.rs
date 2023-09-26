use crate::{
    models::{Memo, MemoTag, NewMemo, Tag},
    schema::{memo_tags, memos, tags},
    Error,
};

use diesel::prelude::*;

use diesel::SqliteConnection;

use crate::db;

use super::{last_insert_rowid, memo_tag};

pub fn add(conn: &SqliteConnection, title: &str, tags: Vec<String>) -> Result<(), Error> {
    let new_post = NewMemo { content: title };

    let result = diesel::insert_into(memos::table)
        .values(&new_post)
        .execute(conn)
        .map_err(|_| Error::DbOperationFailed)?;

    let id = diesel::select(last_insert_rowid)
        .get_result::<i32>(conn)
        .map_err(|_| Error::DbOperationFailed)?;

    for tag in tags {
        let tag_id = super::tag::get(conn, &tag)?;
        memo_tag::add(conn, id, tag_id)?;
    }

    if result == 0 {
        Err(Error::DbOperationFailed)
    } else {
        Ok(())
    }
}

pub fn delete(conn: &SqliteConnection, id: i32) -> Result<(), Error> {
    let target_tags: Vec<MemoTag> = memo_tags::table
        .filter(memo_tags::memo_id.eq(id))
        .load(conn)
        .map_err(|_| Error::DbOperationFailed)?;

    for memo_tag in target_tags {
        memo_tag::delete(conn, memo_tag.memo_id).map_err(|_| Error::DbOperationFailed)?;
    }

    diesel::delete(memos::table.filter(memos::id.eq(id)))
        .execute(conn)
        .map_err(|_| Error::DbOperationFailed)?;
    Ok(())
}

pub fn update(conn: &SqliteConnection, id: i32, text: &str, tags: Vec<&str>) -> Result<(), Error> {
    let result = diesel::update(memos::table.find(id))
        .set(memos::content.eq(text))
        .execute(conn)
        .map_err(|_| Error::DbInvalidArgs)?;

    for tag in tags {
        db::memo_tag::add(conn, id, db::tag::get(conn, tag)?)?;
    }

    if result == 0 {
        Err(Error::DbInvalidArgs)
    } else {
        Ok(())
    }
}

pub fn get(conn: &SqliteConnection, id: i32) -> Result<Memo, Error> {
    memos::table
        .find(id)
        .get_result(conn)
        .map_err(|_e| Error::DbOperationFailed)
}

pub fn get_all(
    conn: &SqliteConnection,
    search_query: Vec<String>,
) -> Result<Vec<(Memo, Tag)>, Error> {
    memos::table
        .left_outer_join(memo_tags::table.on(memos::id.eq(memo_tags::memo_id)))
        .inner_join(tags::table.on(tags::id.eq(memo_tags::tag_id)))
        .select((memos::all_columns, tags::all_columns))
        .filter(tags::content.eq_any(search_query))
        .load::<(Memo, Tag)>(conn)
        .map_err(|_e| Error::DbOperationFailed)
}
