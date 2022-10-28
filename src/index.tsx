import { render } from "solid-js/web";
import { Route, Router, Routes } from "@solidjs/router";
import { lazily } from "solidjs-lazily";
import { CoreKeybindHandler } from "./handlers/CoreKeybindHandler";
import { ThemeProvider } from "./contexts/ThemeProvider";
import "./styles/app.scss";
import { Navbar } from "./components/Navbar";

// Lazily load all pages so that they only load when necessary.
const { AuthPage } = lazily(() => import("./pages/AuthPage"));
const { DisclaimerPage } = lazily(() => import("./pages/DisclaimerPage"));
const { HomePage } = lazily(() => import("./pages/HomePage"));

render(() => {
    let acceptedDisclaimer = localStorage.getItem("acceptedDisclaimer") === "true";

    return (
        <Router>
            <CoreKeybindHandler>
                <ThemeProvider>
                    <div id="irisu" class="page-container">
                        <div class="page">
                            {acceptedDisclaimer ? <Navbar /> : null}
                            <div class="page-content">
                                <Routes>
                                    <Route path="/login" component={AuthPage} />
                                    <Route path="/register" component={AuthPage} />
                                    <Route path="/" component={acceptedDisclaimer ? HomePage : DisclaimerPage} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            </CoreKeybindHandler>
        </Router>
    );
}, document.body);