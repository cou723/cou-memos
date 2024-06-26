import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <h1>
                    致命的なエラーが発生しました。アプリを終了してください。
                </h1>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
