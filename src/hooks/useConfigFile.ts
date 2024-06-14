import { useEffect, useState } from "react";

import { useNotification } from "./useNotification";

import type { Config } from "@/types/config";

import * as api from "@/lib/api";

export function useConfig(): [
    Config,
    React.Dispatch<React.SetStateAction<Config>>,
] {
    const [config, setConfig] = useState<Config>({
        data_path: "",
        is_show_save_button: true,
    } as Config);
    const { pushErrorNotification } = useNotification();

    // pushErrorNotificationを含むと無限ループになる
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const fetchConfig = async () => {
            const config = await api.getConfigWrapper();
            if (config.err) {
                pushErrorNotification(
                    `設定ファイルの読み込みに失敗しました${config.val}`,
                );
                return;
            }
            setConfig(config.val);
        };
        void fetchConfig();
    }, []);

    return [config, setConfig];
}
