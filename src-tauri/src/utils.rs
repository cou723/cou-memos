pub fn show_message(window: tauri::Window, message: &str) {
    window
        .emit("my_event", Some(message))
        .expect("failed to emit");
}
