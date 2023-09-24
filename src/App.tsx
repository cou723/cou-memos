import { IndexPage } from "./pages/IndexPage";
import { ConfigPage } from "./pages/ConfigPage";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { NotificationStack } from "./providers/NotificationProvider";
import { Alert, Button, Toast } from "react-daisyui";
import { closeNotification } from "./hooks/useMemoList";

function App() {
    const { state } = useContext(NotificationStack);

    return (
        <div>
            <Toast vertical="bottom" horizontal="end">
                {state.map((notification, index) => (
                    <Alert status={notification.type}>
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
}

export default App;
