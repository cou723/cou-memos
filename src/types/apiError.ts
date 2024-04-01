const apiErrorList = [
    "DbInvalidArgs",
    "DbNotFound",
    "DbOpenFailed",
    "DbOperationFailed",
    "DbMigrationFailed",
    "ConfigJsonBroken",
    "ConfigNotFound",
    "ConfigOpenFailed",
    "ConfigWriteFailed",
    "ConfigReadFailed",
    "ConfigInvalidKey",
    "UnknownError",
    "CreateDirectoryFailed"
];

export type ApiError = (typeof apiErrorList)[number];

export function isApiError(e: unknown): e is ApiError {
    return typeof e === "string" && apiErrorList.includes(e);
}
