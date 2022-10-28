import { createContext, createEffect, createMemo, createSignal, ParentProps, useContext } from "solid-js";

type Theme = "default" | "not-default";
const themeContext = createContext<Theme>("default");

export function ThemeProvider({
    children
}: ParentProps) {
    const [theme, setTheme] = createSignal<Theme>(localStorage.getItem("theme") as Theme ?? "default");

    // Theme change handler.
    createEffect(() => {
        window.addEventListener("storage", function(e) {
            if (e.key == "theme") {
                setTheme(e.newValue as Theme);
            }
        })
    });

    // Change the html theme setting.
    createEffect(() => {
        document.body.dataset.theme = theme();
    }, [ theme ]);

    return <themeContext.Provider value={theme()}>
        {children}
    </themeContext.Provider>
}

export function useTheme() {
    return useContext(themeContext);
}