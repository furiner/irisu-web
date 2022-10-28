import { useGlobals } from "../../contexts/GlobalProvider";

export function NavbarAccount() {
    const { account } = useGlobals();
    return (
        <div class="navbar-header--right-account">
            {account.loggedIn ? <div>
                
            </div> : <div class="navbar-header--right-account-buttons">  
                <a href="/a" class="navbar-header--right-account-buttons--button">login</a>
                <a href="#" class="navbar-header--right-account-buttons--button">register</a>
            </div>}
        </div>
    )
}