import React, { useReducer, createContext, Dispatch } from "react";

type State = Notification[];
type Action = { type: "push"; value: Notification } | { type: "close"; index: number };
type NotificationType = "info" | "success" | "warning" | "error";
type Notification = {
    message: string;
    type: "info" | "success" | "warning" | "error";
};

const initialState: State = [];

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "push":
            return [...state, action.value];
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
