#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[macro_use]
extern crate diesel;
extern crate dotenv;

pub mod db;
mod entity;
pub mod models;
pub mod schema;

use db::establish_connection;
use entity::Memo;

#[tauri::command]
fn get_file_text(id: i32) -> Result<String, ()> {
    println!("get_file_memo");

    let connection = establish_connection();
    match db::memo::get(&connection, id) {
        Ok(v) => Ok(v.content),
        Err(_) => Err(()),
    }
}

#[tauri::command]
fn add_memo(text: String) -> Result<(), ()> {
    println!("add_memo");

    let tags = text.split(" ").filter(|x| x.starts_with("#")).collect();

    let connection = establish_connection();
    match db::memo::add(&connection, &text, tags) {
        Ok(_) => Ok(()),
        Err(_) => Err(()),
    }
}
#[tauri::command]
fn edit_memo(text: String, id: i32) -> Result<(), ()> {
    println!("add_memo");

    let tags = text.split(" ").filter(|x| x.starts_with("#")).collect();

    let connection = establish_connection();
    match db::memo::update(&connection, id, &text, tags) {
        Ok(_) => Ok(()),
        Err(_) => Err(()),
    }
}

#[tauri::command]
fn delete_memo(id: i32) -> Result<(), ()> {
    println!("delete_memo");

    let connection = establish_connection();
    match db::memo::delete(&connection, id) {
        Ok(_) => Ok(()),
        Err(_) => Err(()),
    }
}

#[tauri::command]
fn get_memo(id: i32) -> Result<Memo, ()> {
    println!("get_memo");

    let connection = establish_connection();

    let memo = db::memo::get(&connection, id).map_err(|_e| ())?;

    let tags = db::tag::get_list(&connection, id).map_err(|_e| ())?;

    Ok(Memo::from_models(memo, tags))
}

#[tauri::command]
fn get_memo_list() -> Result<Vec<Memo>, ()> {
    let mut memos: Vec<entity::Memo> = Vec::new();
    println!("get_memo_list");

    let connection = establish_connection();
    let all_memo_ids = db::memo::get_all_id(&connection)?;

    for memo_id in all_memo_ids {
        memos.push(get_memo(memo_id).map_err(|_e| ())?);
    }

    Ok(memos)
}

fn main() {
    println!("start");
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_file_text,
            edit_memo,
            delete_memo,
            get_memo,
            get_memo_list,
            add_memo
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
