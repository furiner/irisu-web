import anime from "animejs";
import { Accessor, createEffect, ParentProps } from "solid-js";

export interface ModalProps {
    id: string,
    className?: string,
    color?: string,
    title: string,
    open: Accessor<boolean>,
    background?: boolean,
    animate?: boolean,
};

export function Modal({
    id,
    className,
    color = "blue",
    title,
    open,
    background = true,
    animate = false,
    children,
}: ModalProps & ParentProps) {
    const modalClass = `modal modal-${color}`;
    const modalHeaderClass = `modal-${color}-header`;
    const modalBody = <div id={id} class={className ? `${modalClass} ${className}` : modalClass} style={{
        display: open() ? "block" : "none"
    }}>
        <div class={`${modalHeaderClass}`}>
            <span class={`${modalHeaderClass}-title`}>{title}</span>
            <div class={`${modalHeaderClass}--close-button`}>
                x
            </div>
        </div>
        <div class={`modal-content`}>
            {children}
        </div>
    </div>;

    createEffect(() => {
        if (animate) {
            // animate the modal
            anime({
                targets: `#${id}`,

                // translate up
                translateY: [2.5],
                easing: "linear",
                direction: "alternate",
                loop: true
            })
        }
    })

    return background ?
        <div class="modal-background" style={{
            display: open() ? "flex" : "none"
        }}>
            {modalBody}
        </div> :
        modalBody;
}