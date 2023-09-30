type Props = { children: Array<any> };

export const Text = ({ children }: Props) => {
    return <div>{children.map((element) => element)}</div>;
};
