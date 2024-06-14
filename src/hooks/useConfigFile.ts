import { useEffect, useState } from "react";

import { useNotification } from "./useNotification";

import type { Config } from "@/types/config";

import { api } from "@/lib/api";

export function useConfig(): [Config, React.Dispatch<React.SetStateAction<Config>>] {
    const [config, setConfig] = useState<Config>({ data_path: "", is_show_save_button: true } as Config);
    const { pushErrorNotification } = useNotification();

    useEffect(() => {
        const fetchConfig = async () => {
            const config = await api.get_config();
            if (config.err) {
                pushErrorNotification("設定ファイルの読み込みに失敗しました" + config.val);
                return;
            }
            setConfig(config.val);
        };
        void fetchConfig();
        // pushErrorNotificationを含むと無限ループになるため、eslint-disable-next-lineを使用
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [config, setConfig];
}
