import { useState } from "react";

export function useToast() {
    const [notificationStack, setNotificationStack] = useState<string[]>([]);

    const pushNotification = (notification: string) => {
        setNotificationStack([...notificationStack, notification]);
    };

    const popNotification = () => {
        const newNotificationStack = [...notificationStack];
        newNotificationStack.pop();
        setNotificationStack(newNotificationStack);
    };

    return { pushNotification, notificationStack, popNotification };
}
