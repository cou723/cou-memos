import { api } from "@/lib/api";
import { Config } from "@/types/config";
import { useEffect, useState } from "react";
import { pushErrorNotification } from "./useMemoList";

export function useConfigFile(): [Config, React.Dispatch<React.SetStateAction<Config>>] {
    const [config, setConfig] = useState<Config>({ data_path: "" } as Config);

    useEffect(() => {
        const fetchConfig = async () => {
            let config = await api.get_config();
            if (config.err) {
                pushErrorNotification("設定ファイルの読み込みに失敗しました");
                return;
            }
            setConfig(config.val);
        };
        fetchConfig();
    }, []);

    return [config, setConfig];
}
