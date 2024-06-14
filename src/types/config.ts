import { z } from "zod";
const ConfigSchema = z.object({
    data_path: z.string(),
    is_show_save_button: z.boolean(),
}) satisfies z.ZodType<Config>;

export type Config = {
    data_path: string;
    is_show_save_button: boolean;
};

export function isConfig(obj: unknown): obj is Config {
    return ConfigSchema.safeParse(obj).success;
}
