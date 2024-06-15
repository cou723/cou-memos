import { BrowserRouter } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "../lib/queryClient";

import ErrorBoundary from "@/components/ErrorBoundary";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <BrowserRouter>{children}</BrowserRouter>
            </QueryClientProvider>
        </ErrorBoundary>
    );
};
