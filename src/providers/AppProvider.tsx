import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./NotificationProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <NotificationProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <BrowserRouter>{children}</BrowserRouter>
            </QueryClientProvider>
        </NotificationProvider>
    );
};
