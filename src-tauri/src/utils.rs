pub fn extract_tags(text: &str) -> Vec<String> {
    text.split(|c| c == ' ' || c == '\n')
        .filter(|x| x.starts_with("#"))
        .map(|x| x.to_string())
        .collect()
}

pub fn show_message(window: tauri::Window, message: &str) {
    window
        .emit("my_event", Some(message))
        .expect("failed to emit");
}
