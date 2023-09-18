import { api } from "@/lib/api";
import { Config } from "@/types/config";
import { useEffect, useState } from "react";

export function useConfigFile(): [Config, React.Dispatch<React.SetStateAction<Config>>] {
    const [config, setConfig] = useState<Config>({ data_path: "" } as Config);

    useEffect(() => {
        const fetchConfig = async () => {
            let config = (await api.get_config()).unwrap();
            setConfig(config);
        };
        fetchConfig();
    }, []);

    return [config, setConfig];
}
