import { createEffect, createSignal } from "solid-js";
import { useGlobals } from "../../contexts/GlobalProvider";
import { AccountDetails } from "../../structures/Account";

export function NavbarAccount() {
    const { account } = useGlobals();

    return (
        <div class="navbar-header--right-account">
            {account.getSignal<boolean>("login") ? <div class="navbar-header--right-account-details">
                <div class="navbar-header--right-account-details--username">
                    hello, <span>{account.getSignal<AccountDetails>("account")?.username}</span>! <button class="navbar-header--right-account-details--logout">(logout)</button>
                </div>

                <div class="navbar-header--right-account-buttons">
                    <a href="#" class="navbar-header--right-account-buttons--button">profile <span style={{ color: "var(--grayscale-5)", "font-size": "0.75em"}}>(unfinished)</span></a>
                    <a href="#" class="navbar-header--right-account-buttons--button">settings <span style={{ color: "var(--grayscale-5)", "font-size": "0.75em"}}>(unfinished)</span></a>
                </div>
            </div> : <div class="navbar-header--right-account-buttons">
                <a href="/login" class="navbar-header--right-account-buttons--button">login</a>
                <a href="/register" class="navbar-header--right-account-buttons--button">register</a>
            </div>}
        </div>
    )
}