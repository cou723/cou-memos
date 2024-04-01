import { useContext } from "react";

import type { NotificationType } from "@/providers/NotificationProvider";

import { NotificationStack } from "@/providers/NotificationProvider";


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
