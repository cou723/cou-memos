import { NotificationStack, NotificationType } from "@/providers/NotificationProvider";
import { useContext } from "react";

export const useNotification = () => {
    const { dispatch } = useContext(NotificationStack);
    return {
        pushNotification: (message: string, type: NotificationType) => {
            dispatch({ type: "push", notification: { type, message } });
        },
        pushErrorNotification: (message: string) => {
            dispatch({ type: "push", notification: { type: "error", message } });
        },
        closeNotification: (index: number) => {
            dispatch({ type: "close", index });
        }
    };
};
