import { useConfigFile } from "@/hooks/useConfigFile";
import { api } from "@/lib/api";
import React, { FC } from "react";
import { Button, Checkbox, Form, Input } from "react-daisyui";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export const ConfigPage: FC<{}> = React.memo(() => {
    const [config, setConfig] = useConfigFile();
    const nav = useNavigate();

    const handleDbPathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({ ...config, data_path: e.target.value });
    };

    const handleIsSaveSaveButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({ ...config, is_show_save_button: e.target.checked });
    };

    console.log(config);

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
                    <Input value={config.data_path} onInput={handleDbPathChange} bordered className="w-full mr-3" />{" "}
                    <Button>Select folder</Button>
                </div>

                <div className="flex">
                    <Form.Label className="w-full" title="保存ボタンを表示する">
                        <Checkbox checked={!!config.is_show_save_button} onChange={handleIsSaveSaveButtonChange} />
                    </Form.Label>
                </div>

                <Button className="mt-5 w-full" onClick={() => api.save_config(config)}>
                    保存
                </Button>
            </div>
        </>
    );
});
