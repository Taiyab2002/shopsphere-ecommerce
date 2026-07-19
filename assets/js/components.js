async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) return;

    try {

        const response = await fetch(file);

        element.innerHTML = await response.text();

        updateNavbarCounters();

    }

    catch (error) {

        console.error("Component load failed:", error);

    }

}

function updateNavbarCounters() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const cartCount = document.getElementById("cart-count");

    const wishlistCount = document.getElementById("wishlist-count");

    if (cartCount) {

        cartCount.textContent =
            cart.reduce((sum, item) => sum + item.quantity, 0);

    }

    if (wishlistCount) {

        wishlistCount.textContent = wishlist.length;

    }

}

document.addEventListener("DOMContentLoaded", () => {

    const path = window.location.pathname;

    const isHome =
        path.endsWith("index.html") ||
        path === "/" ||
        path.endsWith("/shopsphere-ecommerce/");

    const componentPath = isHome
        ? "components/"
        : "../components/";

    loadComponent("navbar-container", componentPath + "navbar.html");

    loadComponent("footer-container", componentPath + "footer.html");

});