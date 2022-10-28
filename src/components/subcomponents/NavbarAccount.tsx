import { useGlobals } from "../../contexts/GlobalProvider";

export function NavbarAccount() {
    const { account } = useGlobals();
    return (
        <div class="navbar-header--right-account">
            {account.loggedIn ? <div>
                
            </div> : <div class="navbar-header--right-account-buttons">  
                <a href="/auth?type=login" class="navbar-header--right-account-buttons--button">login</a>
                <a href="/auth?type=register" class="navbar-header--right-account-buttons--button">register</a>
            </div>}
        </div>
    )
}