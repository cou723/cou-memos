#[macro_use]
extern crate diesel;
extern crate dotenv;

pub mod models;
pub mod schema;

pub use self::models::Memo;
use self::models::NewMemo;
use diesel::prelude::*;
use diesel::result::{DatabaseErrorKind, Error};
use diesel::sqlite::SqliteConnection;
use dotenv::dotenv;

const DB_PATH: &str = "../test.db";

pub fn establish_connection() -> SqliteConnection {
    dotenv().ok();

    SqliteConnection::establish(&DB_PATH).expect(&format!("Error connecting to {}", DB_PATH))
}

pub fn create_memo(conn: &SqliteConnection, title: &str) -> Result<(), Error> {
    use crate::schema::memos;

    let new_post = NewMemo { text: title };

    let result = diesel::insert_into(memos::table)
        .values(&new_post)
        //SQLiteはget_result()は対応していないため、execute()
        .execute(conn)
        .expect("Error saving new post");

    if result == 0 {
        Err(Error::DatabaseError(
            DatabaseErrorKind::UniqueViolation,
            Box::new("".to_string()),
        ))
    } else {
        Ok(())
    }
}

pub fn delete_memo(conn: &SqliteConnection, id: i32) -> Result<(), Error> {
    use crate::schema::memos::dsl::memos;

    let result = diesel::delete(memos.find(id))
        .execute(conn)
        .expect("Error deleting posts");

    if result == 0 {
        Err(Error::DatabaseError(
            DatabaseErrorKind::UniqueViolation,
            Box::new("".to_string()),
        ))
    } else {
        Ok(())
    }
}

pub fn update_memo(conn: &SqliteConnection, id: i32, text: &str) -> Result<(), Error> {
    use crate::schema::memos::dsl;

    let result = diesel::update(dsl::memos.find(id))
        .set(dsl::text.eq(text))
        .execute(conn)
        .expect("Error updating posts");

    if result == 0 {
        Err(Error::DatabaseError(
            DatabaseErrorKind::UniqueViolation,
            Box::new("".to_string()),
        ))
    } else {
        Ok(())
    }
}



pub fn get_memo(conn: &SqliteConnection, id: i32) -> Result<Memo, ()> {
    use crate::schema::memos::dsl::memos;

    let results = memos
        .find(id)
        .load::<models::Memo>(conn)
        .expect("Error loading posts");
    if results.len() == 0 {
        return Err(());
    }
    Ok(results[0].clone())
}

pub fn get_all(conn: &SqliteConnection) -> Result<Vec<Memo>, ()> {
    use crate::schema::memos::dsl::memos;

    match memos.load::<models::Memo>(conn) {
        Ok(v) => Ok(v),
        Err(_) => return Err(()),
    }
}
