use diesel::{no_arg_sql_function, sql_types::Integer, Connection, SqliteConnection};
use diesel_migrations::{any_pending_migrations, run_pending_migrations};
use tauri::{AppHandle, Manager};

pub mod memo;
pub mod memo_tag;
pub mod tag;

use crate::{config, set_config, utils::show_message, Error};

no_arg_sql_function!(last_insert_rowid, Integer);

fn get_window(app: &AppHandle) -> Result<tauri::Window, Error> {
    app.get_window("c-memos").ok_or(Error::WindowFailed)
}

pub fn establish_connection(app: AppHandle) -> Result<SqliteConnection, Error> {
    let config = config::get()?;
    let db_path = config.data_path + "/c_memos";
    let conn = match SqliteConnection::establish(&db_path) {
        Ok(v) => v,
        Err(_) => {
            if let Err(_) = set_config(
                "data_path".to_string(),
                config::get_default_config().data_path,
            ) {
                show_message(get_window(&app)?, "Error: Failed to set config");
            }
            SqliteConnection::establish(&config::get_default_config().data_path)
                .map_err(|_| Error::DbNotFound)?
        }
    };
    if let Ok(is) = any_pending_migrations(&conn) {
        if !is {
            return Ok(conn);
        }
    }
    match run_pending_migrations(&conn) {
        Ok(_) => {}
        Err(_) => {
            show_message(get_window(&app)?, "Error: Failed to migrate");
        }
    }
    Ok(conn)
}
