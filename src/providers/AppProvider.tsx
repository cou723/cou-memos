import { BrowserRouter } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "../lib/queryClient";

import { NotificationProvider } from "./NotificationProvider";


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
