import type { FC } from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { Alert, Button, Toast } from "react-daisyui";

import { useNotification } from "./hooks/useNotification";
import { ConfigPage } from "./pages/ConfigPage";
import { IndexPage } from "./pages/IndexPage";
import { NotificationStack } from "./providers/NotificationProvider";

const App: FC = () => {
    const { state } = useContext(NotificationStack);
    const { closeNotification } = useNotification();

    return (
        <div>
            <Toast vertical="bottom" horizontal="end">
                {state.map((notification, index) => (
                    <Alert status={notification.type} key={index}>
                        <div className={"w-full flex-row justify-between gap-2"}>
                            <h3>{notification.message}</h3>
                        </div>
                        <Button color="ghost" onClick={() => closeNotification(index)}>
                            X
                        </Button>
                    </Alert>
                ))}
            </Toast>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/settings" element={<ConfigPage />} />
            </Routes>
        </div>
    );
};

export default App;
