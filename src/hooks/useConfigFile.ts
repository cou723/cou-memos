import { api } from "@/lib/api";
import { NotificationStack } from "@/providers/NotificationProvider";
import { Config } from "@/types/config";
import { useEffect, useState, useContext } from "react";

export function useConfigFile(): [Config, React.Dispatch<React.SetStateAction<Config>>] {
    const [config, setConfig] = useState<Config>({ data_path: "" } as Config);
    const { dispatch } = useContext(NotificationStack);

    useEffect(() => {
        const fetchConfig = async () => {
            let config = await api.get_config();
            if (config.err) {
                dispatch({ type: "push", value: { type: "error", message: "設定ファイルの読み込みに失敗しました" } });
                return;
            }
            setConfig(config.val);
        };
        fetchConfig();
    }, []);

    return [config, setConfig];
}
