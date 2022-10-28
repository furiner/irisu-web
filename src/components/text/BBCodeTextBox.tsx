import { Accessor } from "solid-js";
import { useGlobals } from "../../contexts/GlobalProvider";

export interface BBCodeTextBoxProps {
    className: string,
    value: Accessor<string>,
}

export function BBCodeTextBox({
    className,
    value,
}: BBCodeTextBoxProps) {
    const { bbcode } = useGlobals();
    
    return (
        <div class={className} innerHTML={bbcode.parse(value())} />
    );
}