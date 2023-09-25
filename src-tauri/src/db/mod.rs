use crate::{config, set_config, Error};
use diesel::{no_arg_sql_function, sql_types::Integer, Connection, SqliteConnection};
use diesel_migrations::{any_pending_migrations, run_pending_migrations};
use std::{fs, path::Path};

pub mod memo;
pub mod memo_tag;
pub mod tag;

no_arg_sql_function!(last_insert_rowid, Integer);

pub fn establish_connection() -> Result<SqliteConnection, Error> {
    println!("get config");
    let config = config::get().map_err(|_| Error::ConfigNotFound)?;
    println!("got config");

    let path = Path::new(&config.data_path);

    println!("path: {:?}", path);
    if !path.exists() {
        fs::create_dir_all(path).map_err(|_| Error::CreateDirectoryFailed)?;
    }
    println!("path exists");

    println!("get connection");
    let db_path = config.data_path + "/c_memos";
    let conn = match SqliteConnection::establish(&db_path) {
        Ok(v) => v,
        Err(_) => {
            set_config(
                "data_path".to_string(),
                config::get_default_config().data_path,
            )?;
            SqliteConnection::establish(&config::get_default_config().data_path)
                .map_err(|_| Error::DbNotFound)?
        }
    };
    println!("got connection");

    println!("any_pending_migrations");
    match any_pending_migrations(&conn) {
        Ok(is) => {
            if is {
                println!("run migration");
                run_pending_migrations(&conn).map_err(|_| Error::DbMigrationFailed)?;
            }
        }
        Err(_) => {
            println!("run migration");
            run_pending_migrations(&conn).map_err(|_| Error::DbMigrationFailed)?;
        }
    }

    println!("establish_connection");
    Ok(conn)
}
