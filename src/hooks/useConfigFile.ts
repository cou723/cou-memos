import { api } from "@/lib/api";
import { Config } from "@/types/config";
import { useEffect, useState, useContext } from "react";
import { NotificationStack } from "@/provider/NotificationProvider";

export function useConfigFile(): [
  Config,
  React.Dispatch<React.SetStateAction<Config>>
] {
  const [config, setConfig] = useState<Config>({ data_path: "" } as Config);
  const { notifications, dispatch } = useContext(NotificationStack);

  useEffect(() => {
    const fetchConfig = async () => {
      let config = await api.get_config();
      if (config.err)
        dispatch({
          type: "push",
          value: { type: "error", message: "configの取得に失敗しました" },
        });
      else setConfig(config);
    };
    fetchConfig();
  }, []);

  return [config, setConfig];
}
