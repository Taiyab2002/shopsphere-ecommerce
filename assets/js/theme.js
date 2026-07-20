const THEME_KEY = "shopsphere-theme";

function getSavedTheme() {

    return localStorage.getItem(THEME_KEY) || "system";

}

function saveTheme(theme) {

    localStorage.setItem(THEME_KEY, theme);

}

function getSystemTheme() {

    return window.matchMedia("(prefers-color-scheme: dark)").matches

        ? "dark"

        : "light";

}

function applyTheme(theme) {

    let activeTheme = theme;

    if (theme === "system") {

        activeTheme = getSystemTheme();

    }

    document.documentElement.setAttribute(

        "data-theme",

        activeTheme

    );

}

function initializeTheme() {

    applyTheme(

        getSavedTheme()

    );

}

document.addEventListener(

    "DOMContentLoaded",

    initializeTheme

);

window.matchMedia(

    "(prefers-color-scheme: dark)"

).addEventListener(

    "change",

    () => {

        if (

            getSavedTheme() === "system"

        ) {

            applyTheme("system");

        }

    }

);