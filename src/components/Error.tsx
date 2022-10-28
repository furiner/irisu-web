import { Accessor } from "solid-js";

export interface ErrorProps {
    text: Accessor<string>,
    show: Accessor<boolean>,
}

export function Error({
    text,
    show,
}: ErrorProps) {
    return (
        <div class="error" style={{
            display: show() ? "block" : "none",
        }}>
            <span class="error-text">{text()}</span>
        </div>
    );
}