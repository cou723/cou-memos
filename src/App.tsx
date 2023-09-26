import { IndexPage } from "./pages/IndexPage";
import { ConfigPage } from "./pages/ConfigPage";
import { Routes, Route } from "react-router-dom";
import { FC, useContext } from "react";
import { NotificationStack } from "./providers/NotificationProvider";
import { Alert, Button, Toast } from "react-daisyui";
import { useNotification } from "./hooks/useMemoList";

const App: FC<{}> = () => {
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
