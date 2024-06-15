import { useEffect, useState } from "react";

import { useNotification } from "./useNotification";

import { getConfig } from "@/bindings";
import type { Config } from "@/types/config";
import { useQuery } from "@tanstack/react-query";

export function useConfig(): [
    Config,
    React.Dispatch<React.SetStateAction<Config>>,
] {
    const { pushErrorNotification } = useNotification();
    const { data } = useQuery<Config, Error>(
        ["config"],
        async () => {
            return await getConfig();
        },
        {
            onError: (error: Error) =>
                pushErrorNotification(
                    `設定ファイルの取得に失敗しました${error.message}`,
                ),
        },
    );
    const [config, setConfig] = useState<Config>(
        data
            ? data
            : ({
                  data_path: "",
                  is_show_save_button: true,
              } as Config),
    );

    return [config, setConfig];
}
