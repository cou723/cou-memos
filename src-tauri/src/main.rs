// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;

const DB_PATH = "memo.json";

use serde::Serialize;
#[derive(Serialize)]
struct Memo {
    id: isize,
    text: String,
    created_at: String,
    updated_at: String,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_file_text(path: String) -> String {
    println!("get_file_text");
    match fs::read_to_string(path.clone()) {
        Ok(text) => text,
        Err(_) => format!("file:{} not found", path),
    }
}

#[tauri::command]
fn add_memo(text: String) -> bool {
    println!("add_memo");
    let path = "memo.txt";
    match fs::write(path, text) {
        Ok(_) => true,
        Err(_) => false,
    }
}

#[tauri::command]
fn edit_memo(text: String, id: String) -> bool {
    return true;
}

#[tauri::command]
fn delete_memo(id: String) -> bool {
    return true;
}

#[tauri::command]
fn get_memo() -> String {
    return String::from("memo");
}

#[tauri::command]
fn get_memo_list() -> Vec<Memo> {
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
