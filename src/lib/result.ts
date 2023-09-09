export type Result<T, E> = (T & { [P in keyof E]?: undefined }) | ({ [K in keyof T]?: undefined } & E);
