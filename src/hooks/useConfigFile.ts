import { api } from "@/lib/api";
import { Config } from "@/types/config";
import { useEffect, useState } from "react";
import { useNotification } from "./useNotification";

export function useConfigFile(): [Config, React.Dispatch<React.SetStateAction<Config>>] {
    const [config, setConfig] = useState<Config>({ data_path: "", is_show_save_button: true } as Config);
    const { pushErrorNotification } = useNotification();

    useEffect(() => {
        const fetchConfig = async () => {
            let config = await api.get_config();
            if (config.err) {
                pushErrorNotification("設定ファイルの読み込みに失敗しました" + config.val);
                return;
            }
            console.log("load config :", config.val);
            setConfig(config.val);
        };
        fetchConfig();
    }, []);

    return [config, setConfig];
}
