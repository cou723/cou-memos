// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;

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

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_file_text])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
