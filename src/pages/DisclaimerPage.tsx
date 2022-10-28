import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";

export function DisclaimerPage() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = createSignal(true);

    function handleButtonClick(type: "accept" | "decline") {
        if (type == "accept") {
            // accept disclaimer and reroute user
            localStorage.setItem("acceptedDisclaimer", "true");
            location.reload();
        } else {
            // close tab
            window.close();
        }
    }

    return (
        <>
            <Modal
                id="disclaimer"
                title="disclaimer for users"
                className="disclaimer"
                color="red"
                open={isOpen}
                animate={true}
            >
                <span>
                    hello there, <strong>user</strong>!
                    <br /> <br />
                    this is a website that uses <a href="#" target="_blank">solid.js</a> to handle it's rendering and processing, and due to the nature of neocities, routing is not possible in the way i would like for it to be; so i have individually disabled the <strong>refresh</strong> button to prevent users from refreshing the page!
                    <br /><br />
                    each individual component of this website will still use the url path, but it won't refresh the page; only re-render to fit what page you're on as well as the data you're trying to see in order to ensure a smooth experience!
                    <br /><br />
                    i have added this notice for users who wish to acknowledge this; otherwise, you can just close the tab and go on your way, and the deny button will do so.
                    <br /><br />
                    if you still wish to refresh, i have added a new keybind for that!<br /><strong>ctrl + q</strong>.
                </span>

                <div class="disclaimer--accept-buttons">
                    <Button text="accept" onClick={() => handleButtonClick("accept")} />
                    <Button text="deny" onClick={() => handleButtonClick("decline")} />
                </div>

                <div class="disclaimer--footer">
                    <a href="#" target="_blank">source code</a>
                    <a href="#" target="_blank">twitter</a>
                </div>
            </Modal>
        </>
    )
}