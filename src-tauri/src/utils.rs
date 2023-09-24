pub fn extract_tags(text: &str) -> Vec<String> {
    text.split(|c| c == ' ' || c == '\n')
        .filter(|x| x.starts_with("#"))
        .map(|x| x.to_string())
        .collect()
}
