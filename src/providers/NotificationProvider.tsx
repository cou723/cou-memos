import React, { useReducer, createContext, Dispatch } from "react";

type State = Notification[];
type Action = { type: "push"; notification: Notification } | { type: "close"; index: number };
export type NotificationType = "info" | "success" | "warning" | "error";
export type Notification = {
    message: string;
    type: NotificationType;
};

const initialState: State = [];

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "push":
            return [...state, action.notification];
        case "close":
            var _state = [...state];
            return _state.filter((_value, index) => index !== action.index);
        default:
            return state;
    }
}

interface ContextValue {
    state: State;
    dispatch: Dispatch<Action>;
}

export const NotificationStack = createContext<ContextValue>({ state: initialState, dispatch: () => undefined });

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <NotificationStack.Provider value={{ state, dispatch }}>{children}</NotificationStack.Provider>;
}
