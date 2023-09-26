export type Config = {
    data_path: string;
    is_show_save_button: boolean;
};

export function isConfig(obj: any): obj is Config {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.data_path === "string" &&
        typeof obj.is_show_save_button === "boolean"
    );
}
