type Text = {
    before: "\n" | " " | null;
    text: string;
};

export function splitTags(input: string): Text[] {
    const regex = /(\s*)(\S+)/g;
    const result: Text[] = [];
    let match;

    while ((match = regex.exec(input)) !== null) {
        result.push({
            before: match[1].includes("\n") ? "\n" : match[1].includes(" ") ? " " : null,
            text: match[2]
        });
    }

    if (result.length > 0) {
        result[0].before = null;
    }

    return result;
}
