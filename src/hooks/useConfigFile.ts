import { useState } from "react";

import { getConfig } from "@/bindings";
import type { Config } from "@/types/config";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useConfig(): [
    Config,
    React.Dispatch<React.SetStateAction<Config>>,
] {
    const { data } = useQuery<Config, Error>(
        ["config"],
        async () => {
            return await getConfig();
        },
        {
            onError: (error: Error) =>
                toast.error(`設定ファイルの取得に失敗しました${error.message}`),
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
