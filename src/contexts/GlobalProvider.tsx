import { createContext, createSignal, ParentProps, useContext } from "solid-js";
import { Account } from "../structures/Account";
import { BBCode } from "../util/BBCode";

interface GlobalContext {
    bbcode: BBCode,
    account: Account,
    isBirthday: boolean,
}

// check whether it's my birthday
// november 4th
const isBirthday = new Date().getMonth() === 10 && new Date().getDate() === 4;

const globalContext = createContext<GlobalContext>({
    bbcode: new BBCode(),
    account: new Account(),
    isBirthday: isBirthday,
} as GlobalContext);

export function ThemeProvider({
    children
}: ParentProps) {
    const [ globals ] = createSignal({
        bbcode: new BBCode(),
        account: new Account(),
        isBirthday: isBirthday,
    } as GlobalContext);

    return <globalContext.Provider value={globals()}>
        {children}
    </globalContext.Provider>
}

export function useGlobals() {
    return useContext(globalContext);
}