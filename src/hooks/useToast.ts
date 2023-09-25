import { useState } from "react";

export function useToast() {
    const [notificationStack, setNotificationStack] = useState<string[]>([]);

    return { pushNotification, notificationStack, popNotification };
}
