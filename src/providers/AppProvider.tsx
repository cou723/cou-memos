import { BrowserRouter } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "../lib/queryClient";

import { NotificationProvider } from "./NotificationProvider";

import ErrorBoundary from "@/components/ErrorBoundary";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ErrorBoundary>
            <NotificationProvider>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <BrowserRouter>{children}</BrowserRouter>
                </QueryClientProvider>
            </NotificationProvider>
        </ErrorBoundary>
    );
};
