import { useConfigFile } from "@/hooks/useConfigFile";
import { api } from "@/lib/api";
import React from "react";
import { Button, Input } from "react-daisyui";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export const ConfigPage = React.memo(() => {
    const [config, setConfig] = useConfigFile();
    const nav = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({ ...config, data_path: e.target.value });
    };

    return (
        <>
            <Button
                onClick={() => {
                    nav("/");
                }}
                shape="circle"
                className="px-3 fixed top-3 left-3"
                variant="outline"
            >
                <HiOutlineChevronDoubleLeft className="text-xl" />
            </Button>
            <div className="w-3/4 m-auto mt-10">
                <label className="label">
                    <span className="label-text">データファイル保存場所</span>
                </label>
                <div className="flex ">
                    <Input value={config.data_path} onInput={handleChange} bordered className="w-full mr-3" />{" "}
                    <Button>Select folder</Button>
                </div>
                <Button className="mt-5 w-full" onClick={() => api.set_config("data_path", config.data_path!)}>
                    保存
                </Button>
            </div>
        </>
    );
});
