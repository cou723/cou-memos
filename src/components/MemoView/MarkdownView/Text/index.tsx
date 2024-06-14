import type React from "react";

type Props = { children: React.ReactNode[] };

export const Text = ({ children }: Props) => {
    return <div>{children.map((element) => element)}</div>;
};
