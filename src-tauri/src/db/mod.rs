use diesel::{no_arg_sql_function, sql_types::Integer, Connection, SqliteConnection};

pub mod memo;
pub mod memo_tag;
pub mod tag;

use dotenv::dotenv;

const DB_PATH: &str = "../test.db";

no_arg_sql_function!(last_insert_rowid, Integer);

pub fn establish_connection() -> SqliteConnection {
    dotenv().ok();

    SqliteConnection::establish(&DB_PATH).expect(&format!("Error connecting to {}", DB_PATH))
}
