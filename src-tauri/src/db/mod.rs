use crate::{config, set_config, Error};
use diesel::{no_arg_sql_function, sql_types::Integer, Connection, SqliteConnection};
use diesel_migrations::{any_pending_migrations, run_pending_migrations};
use std::{fs, path::Path};

pub mod memo;
pub mod memo_tag;
pub mod tag;

no_arg_sql_function!(last_insert_rowid, Integer);

pub fn establish_connection() -> Result<SqliteConnection, Error> {
    let config = config::get().map_err(|_| Error::ConfigNotFound)?;

    let path = Path::new(&config.data_path);

    if !path.exists() {
        fs::create_dir_all(path).map_err(|_| Error::CreateDirectoryFailed)?;
    }

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

    match any_pending_migrations(&conn) {
        Ok(is) => {
            if is {
                run_pending_migrations(&conn).map_err(|_| Error::DbMigrationFailed)?;
            }
        }
        Err(_) => {
            run_pending_migrations(&conn).map_err(|_| Error::DbMigrationFailed)?;
        }
    }

    println!("establish_connection");
    Ok(conn)
}
