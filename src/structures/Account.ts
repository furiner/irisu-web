import { Accessor, createSignal, Setter } from "solid-js";
import { RestClient } from "../util/RestClient";

export type AccountSignals = "login" | "account";
export interface AccountDetails {
    username?: string;
}

export class Account {
    public rest: RestClient;

    // signals
    private loginSignal: Accessor<boolean>;
    private _setLoginSignal: Setter<boolean>;
    public accountSignal: Accessor<AccountDetails | undefined>;
    private _setAccountSignal: Setter<AccountDetails | undefined>;

    constructor() {
        this.rest = new RestClient(this);

        // check for a session
        let token = localStorage.getItem("session");
        const [ loginSignal, setLoginSignal ] = createSignal(false);
        const [ accountSignal, setAccountSignal ] = createSignal<AccountDetails | undefined>();

        this.loginSignal = loginSignal;
        this._setLoginSignal = setLoginSignal;
        this.accountSignal = accountSignal;
        this._setAccountSignal = setAccountSignal;

        if (token) {
            this.validateSession(token);
        }
    }

    // SIGNAL FUNCTIONS
    public getSignal<T>(signal: AccountSignals): T | undefined {
        const signalName = `${signal}Signal` as keyof Account;
        if (this[signalName]) {
            let getter = this[signalName] as Accessor<T>;

            return getter();
        }

        return undefined;
    }

    public setSignal<T>(signal: AccountSignals, value: T): Account {
        const signalName = `_set${signal.charAt(0).toUpperCase()}${signal.slice(1)}Signal` as keyof Account;
        if (this[signalName]) {
            let setter = this[signalName] as Setter<T>;

            setter((_prev) => value);
        }

        return this;
    }

    // AUTH FUNCTIONS
    public validateSession(token: string) {
        this.rest.request("https://ncx.irisu.us/api/auth/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token
            })
        }).then((res) => {
            if (res.data.valid) {
                this.setSignal("login", true);
                this.setSignal("account", res.data.account);
            } else {
                // delete token from local storage
                localStorage.removeItem("session");
                this.setSignal("login", false);
            }
        });
    }

    public login(username: string, password: string) {
        return this.rest.request("https://ncx.irisu.us/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
    }

    public register(username: string) {
        return this.rest.request("https://ncx.irisu.us/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username
            })
        })
    }
}