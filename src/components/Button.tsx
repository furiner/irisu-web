import { JSX } from "solid-js";

export interface ButtonProps {
    text: string,
    onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>,
}

export function Button({
    text,
    onClick
}: ButtonProps) {
    return <button class="button" onClick={onClick}>{text}</button>;
}