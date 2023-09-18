import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./NotificationProvider";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <NotificationProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>{children}</BrowserRouter>
            </QueryClientProvider>
        </NotificationProvider>
    );
};
