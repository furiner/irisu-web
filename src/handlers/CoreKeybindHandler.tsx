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

        if (anchor && anchor.pathname) {
            if (anchor.target == "_blank") {
                return;
            }


            // parse query params and turn them into an object
            const params = new URLSearchParams(anchor.search);

            // navigate route
            e.preventDefault();

            // validate whether the current page is the same as the one we're trying to navigate to
            if (!anchor.pathname)
                return;

            if (window.location.pathname == anchor.pathname) {
                navigate(anchor.pathname, {
                    resolve: true,
                    replace: true,
                    state: Object.fromEntries(params.entries())
                });
            } else {
                navigate(anchor.pathname, {
                    state: Object.fromEntries(params.entries())
                });
            }
        }
    })

    return (
        <>
            {children}
        </>
    );
}