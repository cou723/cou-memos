pub fn extract_tags(text: &str) -> Vec<String> {
    text.split(|c| c == ' ' || c == '\n')
        .filter(|word| word.starts_with("#") && !is_fill(word, '#'))
        .map(|word| word.to_string())
        .collect()
}

pub fn is_fill(s: &str, ch: char) -> bool {
    s.chars().all(|c| c == ch)
}
