import { useLocation, useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { Button } from "../components/Button";
import { Error } from "../components/Error";
import { Form } from "../components/Form";
import { Modal } from "../components/Modal";
import { useGlobals } from "../contexts/GlobalProvider";

type AuthType = "login" | "register";
type AccountCombo = {
    username: string;
    password: string;
}

export function AuthPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const authType = location.pathname == "/login" ? "login" : "register";
    const { account } = useGlobals();

    const [showError, setShowError] = createSignal(false);
    const [showPasswordModal, setShowPasswordModal] = createSignal(false);
    const [accountCombo, setAccountCombo] = createSignal({
        username: "unknown username",
        password: "unknown password combo"
    } as AccountCombo);
    const [errorText, setErrorText] = createSignal("unknown error");
    const [errorTimeout, setErrorTimeout] = createSignal<NodeJS.Timeout>();

    let pword = "";

    // form on submit
    const onSubmit = (e: Event, ref?: HTMLFormElement) => {
        // get form data
        const formData = new FormData(ref);
        const username = formData.get("username") as string;

        if (authType == "login") {
            const password = formData.get("password") as string;
            
            account.login(username, password).then((res) => {
    
                // set session token
                localStorage.setItem("session", res.data.token);
            }).catch((err) => {
                throw err;
            });
        } else {
            account.register(username).then((body) => {
                // success, show password modal
                setAccountCombo({
                    username: username,
                    password: body.data.key
                });

                setShowPasswordModal(true);
            }).catch((err) => {
                setErrorText(err.message);
                setShowError(true);

                if (errorTimeout()) {
                    clearTimeout(errorTimeout());
                }

                setErrorTimeout(setTimeout(() => {
                    setShowError(false);
                }, 5000));
            })
        }

    }

    return (
        <div class="auth">
            <div class="auth-header">
                <span class="auth-header--title">{authType == "login" ? "login" : "register"}</span>
                <span class="auth-header--subtitle">{authType == "login" ? "get back in to your account" : "new here? registration is free"}</span>
            </div>

            <div class="auth-content">
                <Error show={showError} text={errorText} />
                <Form
                    id="auth-form"
                    className="auth-content--form"
                    onSubmit={onSubmit}
                >
                    <label for="username" class="auth-content--form--input-label">username: </label>
                    <input id="username" type="text" name="username" class="auth-content--form--input" placeholder="username" />

                    {authType == "login" && (
                        <>
                            <label for="password" class="auth-form--input-label">password: </label>
                            <input id="password" type="password" name="password" class="auth-content--form--input" placeholder="password" />
                        </>
                    )}

                    <input type="submit" class="auth-content--form--submit" value={authType == "login" ? "login" : "sign up"} />
                </Form>
            </div>

            <Modal
                id="auth-password-modal"
                title="heres your password!"
                className="auth--password-modal"
                open={showPasswordModal}
            >
                <span>
                    hello there, {accountCombo().username}! <br />
                    i see you've made an account!
                    <br /><br />
                    to put it in short, i made a really unique means of handling passwords; a 16-word long set of words that you can use to log in. i would reccommend you to write this down somewhere, as you will not be able to recover your account if you lose it. if you have sustainable proof that you are the owner of the account, i will be able to help you recover it if you make a basic issue on my github!

                </span>

                <pre>
                    {accountCombo().password}
                </pre>

                <div class="auth--password-modal--buttons">
                    <Button text="accept" onClick={() => { navigate("/login") }} />
                </div>
            </Modal>
        </div>
    );
}