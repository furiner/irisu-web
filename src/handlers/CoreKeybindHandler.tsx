import { useNavigate } from "@solidjs/router";
import { ParentProps } from "solid-js";

export function CoreKeybindHandler({
    children,
}: ParentProps) {
    const navigate = useNavigate();

    // keybind handlers
    document.addEventListener("DOMContentLoaded", function () {
        document.addEventListener("keydown", function (e) {
            // no refreshing allowed
            if (e.key == "F5" || e.key == "r" && e.ctrlKey) {
                //e.preventDefault();
            }
        })
    });

    // hijack <a> tags and use routes instead
    document.body.addEventListener("click", function (e) {
        const anchor = e.target as HTMLAnchorElement;

        if (anchor) {
            if (anchor.target == "_blank") {
                return;
            }

            // navigate route
            e.preventDefault();
            navigate(anchor.href);
        }
    })

    return (
        <>
            {children}
        </>
    );
}