import { ParentProps } from "solid-js";

export interface FormProps {
    id: string;
    className?: string;
    onSubmit: (e: Event, ref?: HTMLFormElement) => void;
}

export function Form({
    id,
    onSubmit,
    className,
    children,
}: FormProps & ParentProps) {
    let selfRef: HTMLFormElement | undefined;
    
    const onSubmitHandler = (e: Event) => {
        e.preventDefault();

        onSubmit(e, selfRef);
    }

    return (
        <form
            id={id}
            onSubmit={onSubmitHandler}
            class={className}
            ref={selfRef}
        >
            {children}
        </form>
    );
}