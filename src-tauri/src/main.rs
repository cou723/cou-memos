#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[macro_use]
extern crate diesel_migrations;

embed_migrations!("migrations");

#[macro_use]
extern crate diesel;
extern crate dotenv;

pub mod config;
pub mod db;
mod entity;
pub mod models;
pub mod schema;
pub mod utils;

use config::Config;
use db::establish_connection;
use entity::Memo;
use serde::{Deserialize, Serialize};
#[cfg(debug_assertions)]
use tauri::Manager;

use crate::utils::extract_tags;

pub const CONFIG_FILE_PATH: &str = "../config.json";

#[derive(Serialize, Deserialize)]
pub enum Error {
    CreateDirectoryFailed,
    DbInvalidArgs,
    DbNotFound,
    DbOpenFailed,
    DbOperationFailed,
    DbMigrationFailed,
    ConfigJsonBroken,
    ConfigNotFound,
    ConfigOpenFailed,
    ConfigWriteFailed,
    ConfigReadFailed,
    ConfigInvalidKey,
}

#[tauri::command]
fn get_config() -> Result<Config, Error> {
    config::get()
}

#[tauri::command]
fn set_config(key: String, value: String) -> Result<(), Error> {
    config::set(key, value)
}

#[tauri::command]
fn save_config(config: Config) -> Result<(), Error> {
    config::set_all(config)
}

#[tauri::command]
fn get_file_text(id: i32) -> Result<String, Error> {
    println!("get_file_memo");

    let connection = establish_connection()?;
    db::memo::get(&connection, id).map(|x| x.content)
}

#[tauri::command]
fn add_memo(text: String) -> Result<(), Error> {
    println!("add_memo");

    let tags = extract_tags(&text);

    let connection = establish_connection()?;
    db::memo::add(&connection, &text, tags)
}

#[tauri::command]
fn edit_memo(text: String, id: i32) -> Result<(), Error> {
    println!("add_memo");

    let tags = text.split(" ").filter(|x| x.starts_with("#")).collect();

    let connection = establish_connection()?;
    db::memo::update(&connection, id, &text, tags)
}

#[tauri::command]
fn delete_memo(id: i32) -> Result<(), Error> {
    println!("delete_memo");

    let connection = establish_connection()?;
    db::memo::delete(&connection, id)
}

#[tauri::command]
fn get_memo(id: i32) -> Result<Memo, Error> {
    println!("get_memo :{}", id);

    let connection = establish_connection()?;
    let memo = db::memo::get(&connection, id)?;
    let tags = db::tag::get_list(&connection, &id)?;

    Ok(Memo::from_models(memo, tags))
}

#[tauri::command]
fn get_memo_list(search_query: Vec<String>) -> Result<Vec<Memo>, Error> {
    println!("call get_memo_list: {:?}", search_query);
    let mut memos: Vec<entity::Memo> = Vec::new();

    let connection = establish_connection()?;

    let memo_tags = db::memo::get_all(&connection, search_query)?;

    for memo_tag in memo_tags {
        if memos.iter().filter(|x| x.id == memo_tag.0.id).count() == 0 {
            memos.push(Memo {
                id: memo_tag.0.id,
                content: memo_tag.0.content,
                updated_at: memo_tag.0.updated_at,
                created_at: memo_tag.0.created_at,
                tags: match memo_tag.1 {
                    Some(x) => vec![x.clone()],
                    None => vec![],
                },
            });
        } else {
            let target = memos.iter_mut().find(|x| x.id == memo_tag.0.id).unwrap();
            match memo_tag.1 {
                Some(x) => target.tags.push(x.clone()),
                None => {}
            }
        }
    }

    println!("result get_memo_list: {:?}", memos);

    Ok(memos)
}

fn main() {
    println!("start");
    match tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_file_text,
            edit_memo,
            delete_memo,
            get_memo,
            get_memo_list,
            add_memo,
            get_config,
            set_config,
            save_config
        ])
        .setup(|_app| {
            #[cfg(debug_assertions)]
            _app.get_window("main").unwrap().open_devtools();
            Ok(())
        })
        .run(tauri::generate_context!())
    {
        Ok(_) => {}
        Err(e) => {
            println!("error: {}", e);
        }
    }
}
