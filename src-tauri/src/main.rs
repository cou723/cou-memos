// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_app::establish_connection;
use tauri_app::Memo;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_file_text(id: i32) -> Result<String, ()> {
    println!("get_file_memo");

    let connection = establish_connection();
    match tauri_app::get_memo(&connection, id) {
        Ok(v) => Ok(v.text),
        Err(_) => Err(()),
    }
}

#[tauri::command]
fn add_memo(text: String) -> bool {
    println!("add_memo");

    let connection = establish_connection();
    match tauri_app::create_memo(&connection, &text) {
        Ok(_) => true,
        Err(_) => false,
    }
}

#[tauri::command]
fn edit_memo(text: String, id: i32) -> bool {
    println!("add_memo");

    let connection = establish_connection();
    match tauri_app::update_memo(&connection, id, &text) {
        Ok(_) => true,
        Err(_) => false,
    }
}

#[tauri::command]
fn delete_memo(id: i32) -> bool {
    println!("delete_memo");

    let connection = establish_connection();
    match tauri_app::delete_memo(&connection, id) {
        Ok(_) => true,
        Err(_) => false,
    }
}

#[tauri::command]
fn get_memo(id: i32) -> Result<Memo, ()> {
    println!("get_memo");

    let connection = establish_connection();
    tauri_app::get_memo(&connection, id)
}

#[tauri::command]
fn get_memo_list() -> Vec<Memo> {
    println!("get_memo_list");
    let v = vec![Memo {
        id: 1,
        text: String::from("memo"),
        created_at: String::from("2021-01-01"),
        updated_at: String::from("2021-01-01"),
    }];
    return v;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_file_text])
        .invoke_handler(tauri::generate_handler![add_memo])
        .invoke_handler(tauri::generate_handler![edit_memo])
        .invoke_handler(tauri::generate_handler![delete_memo])
        .invoke_handler(tauri::generate_handler![get_memo])
        .invoke_handler(tauri::generate_handler![get_memo_list])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
