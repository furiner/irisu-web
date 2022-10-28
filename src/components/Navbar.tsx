import { useNavigate } from "@solidjs/router";
import { NavbarAccount } from "./subcomponents/NavbarAccount";

type CurrentPage = "home";

export interface NavbarProps {
    currentPage?: CurrentPage;
}

const pageMap = {
    home: "/"
}

const subtextValues = [
    "into the void",
    "does anyone actually read these",
    "a place for me to store my thoughts"
];

function getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function Navbar({
    currentPage = "home",
}: NavbarProps) {
    const navigate = useNavigate();

    function handleButtonClick(page: CurrentPage) {
        navigate(`/${page}`);
    }

    return (
        <nav class="navbar">
            <div class="navbar-header">
                <div class="navbar-header--text">
                    <span class="navbar-header--text-title">irisu's space</span>
                    <span class="navbar-header--text-subtitle">{subtextValues[getRndInteger(0, subtextValues.length - 1)]}</span>
                </div>

                <div class="navbar-header--right">
                    <div class="navbar-header--right-search">
                        <label for="search" class="navbar-header--right-search-label">search: </label>
                        <input type="text" placeholder="search" />
                    </div>

                    <NavbarAccount />
                </div>
            </div>
            <div class="navbar-buttons">
                {Object.keys(pageMap).map((page) => (
                    <a
                        href={pageMap[page as CurrentPage]}
                        class={`navbar-buttons--button ${currentPage == page ? "navbar-buttons--button-active" : ""}`}
                    >{page}</a>
                ))}
            </div>
        </nav>
    )
}