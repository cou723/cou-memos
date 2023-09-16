// @generated automatically by Diesel CLI.

diesel::table! {
    memo_tags (memo_id, tag_id) {
        memo_id -> Integer,
        tag_id -> Integer,
    }
}

diesel::table! {
    memos (id) {
        id -> Integer,
        content -> Text,
        created_at -> Text,
        updated_at -> Text,
    }
}

diesel::table! {
    tags (id) {
        id -> Integer,
        content -> Text,
        created_at -> Text,
    }
}

diesel::joinable!(memo_tags -> memos (memo_id));
diesel::joinable!(memo_tags -> tags (tag_id));

diesel::allow_tables_to_appear_in_same_query!(
    memo_tags,
    memos,
    tags,
);
