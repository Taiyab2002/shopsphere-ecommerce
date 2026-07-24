/* ==========================================================
   SHOPSPHERE SHOP.JS
   Production Ready
========================================================== */

/* ==========================================================
   DOM
========================================================== */

const productContainer =
    document.getElementById("product-list");

const searchInput =
    document.getElementById("search-input");

const categoryFilter =
    document.getElementById("category-filter");

const sortFilter =
    document.getElementById("sort-filter");

const resultsCount =
    document.getElementById("results-count");

const pagination =
    document.getElementById("pagination");

/* ==========================================================
   STORAGE
========================================================== */

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

/* ==========================================================
   PRODUCTS
========================================================== */

let filteredProducts = [...products];

let currentPage = 1;

const productsPerPage = 8;

/* ==========================================================
   STORAGE HELPERS
========================================================== */

function saveCart() {

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

}

function saveWishlist() {

    localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)

    );

}

/* ==========================================================
   NAVBAR COUNTERS
========================================================== */

function updateCartCount() {

    const counter =
        document.getElementById("cart-count");

    if (!counter) return;

    counter.textContent =

        cart.reduce(

            (sum, item) =>

                sum + item.quantity,

            0

        );

}

function updateWishlistCount() {

    const counter =
        document.getElementById("wishlist-count");

    if (!counter) return;

    counter.textContent =
        wishlist.length;

}

/* ==========================================================
   PREMIUM TOAST
========================================================== */

function showShopToast(message) {

    if (

        typeof window.showToast === "function"

    ) {

        window.showToast(

            "success",

            "Success",

            message

        );

    }

}
/* ==========================================================
   WISHLIST HELPERS
========================================================== */

function isInWishlist(id) {

    return wishlist.some(

        product => product.id === id

    );

}

function toggleWishlist(id) {

    const product =

        products.find(

            item => item.id === id

        );

    if (!product) return;

    const index =

        wishlist.findIndex(

            item => item.id === id

        );

    if (index === -1) {

        wishlist.push(product);

        showShopToast(

            product.name +

            " added to wishlist."

        );

    } else {

        wishlist.splice(index, 1);

        showShopToast(

            product.name +

            " removed from wishlist."

        );

    }

    saveWishlist();

    updateWishlistCount();

    renderProducts();

}

/* ==========================================================
   CART HELPERS
========================================================== */

function addToCart(id) {

    const product =

        products.find(

            item => item.id === id

        );

    if (!product) return;

    const existing =

        cart.find(

            item => item.id === id

        );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    saveCart();

    updateCartCount();

    showShopToast(

        product.name +

        " added to cart."

    );

}

/* ==========================================================
   RESULT COUNTER
========================================================== */

function updateResultsCount() {

    if (!resultsCount) return;

    resultsCount.textContent =

        `Showing ${filteredProducts.length} Product${

            filteredProducts.length === 1

                ? ""

                : "s"

        }`;

}
/* ==========================================================
   PRODUCT CARD
========================================================== */

function createProductCard(product) {

    return `

<div class="col-lg-3 col-md-6">

    <div class="product-card premium-product-card h-100 position-relative tilt">

        <span class="product-badge">

            NEW

        </span>

        <button

            type="button"

            class="wishlist-btn"

            data-id="${product.id}">

            <i class="${

                isInWishlist(product.id)

                    ? "fas fa-heart text-danger"

                    : "far fa-heart"

            }"></i>

        </button>

        <div class="product-image-wrapper">

            <img

                src="${product.image}"

                class="card-img-top"

                alt="${product.name}">

            <div class="product-overlay">

                <a

                    href="product.html?id=${product.id}"

                    class="quick-view-btn">

                    <i class="fa-solid fa-eye"></i>

                    Quick View

                </a>

            </div>

        </div>

        <div class="card-body text-center">

            <small class="product-category">

                ${product.category}

            </small>

            <h5 class="card-title">

                ${product.name}

            </h5>

            <div class="rating">

                ★★★★★

            </div>

            <div class="price-row">

                <span class="price">

                    $${product.price.toFixed(2)}

                </span>

            </div>

            <button

                class="btn btn-primary add-cart-btn w-100"

                data-id="${product.id}">

                <i class="fa-solid fa-cart-shopping me-2"></i>

                Add to Cart

            </button>

        </div>

    </div>

</div>

`;

}
/* ==========================================================
   RENDER PRODUCTS
========================================================== */

function renderProducts() {

    if (!productContainer) return;

    productContainer.innerHTML = "";

    if (filteredProducts.length === 0) {

        productContainer.innerHTML = `

<div class="col-12 text-center py-5">

    <h3>

        No Products Found

    </h3>

</div>

`;

        updateResultsCount();

        if (pagination) {

            pagination.innerHTML = "";

        }

        return;

    }

    const start =

        (currentPage - 1) *

        productsPerPage;

    const end =

        start +

        productsPerPage;

    const visibleProducts =

        filteredProducts.slice(

            start,

            end

        );

    visibleProducts.forEach(product => {

        productContainer.innerHTML +=

            createProductCard(product);

    });

    updateResultsCount();

    renderPagination();

    initializeProductEvents();

}
/* ==========================================================
   PAGINATION
========================================================== */

function renderPagination() {

    if (!pagination) return;

    pagination.innerHTML = "";

    const totalPages = Math.ceil(

        filteredProducts.length /

        productsPerPage

    );

    if (totalPages <= 1) return;

    /* Previous */

    pagination.innerHTML += `

<li class="page-item ${currentPage === 1 ? "disabled" : ""}">

    <button

        class="page-link"

        data-page="prev">

        <i class="fa-solid fa-angle-left"></i>

    </button>

</li>

`;

    /* Numbers */

    for (

        let page = 1;

        page <= totalPages;

        page++

    ) {

        pagination.innerHTML += `

<li class="page-item ${page === currentPage ? "active" : ""}">

    <button

        class="page-link"

        data-page="${page}">

        ${page}

    </button>

</li>

`;

    }

    /* Next */

    pagination.innerHTML += `

<li class="page-item ${currentPage === totalPages ? "disabled" : ""}">

    <button

        class="page-link"

        data-page="next">

        <i class="fa-solid fa-angle-right"></i>

    </button>

</li>

`;

    pagination.querySelectorAll(

        ".page-link"

    ).forEach(button => {

        button.addEventListener(

            "click",

            function () {

                const page =

                    this.dataset.page;

                if (

                    page === "prev" &&

                    currentPage > 1

                ) {

                    currentPage--;

                }

                else if (

                    page === "next" &&

                    currentPage < totalPages

                ) {

                    currentPage++;

                }

                else if (

                    !isNaN(page)

                ) {

                    currentPage =

                        Number(page);

                }

                renderProducts();

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }

        );

    });

}
/* ==========================================================
   PRODUCT EVENTS
========================================================== */

function initializeProductEvents() {

    /* -----------------------------
       ADD TO CART
    ----------------------------- */

    document.querySelectorAll(

        ".add-cart-btn"

    ).forEach(button => {

        button.onclick = () => {

            addToCart(

                Number(

                    button.dataset.id

                )

            );

        };

    });

    /* -----------------------------
       WISHLIST
    ----------------------------- */

    document.querySelectorAll(

        ".wishlist-btn"

    ).forEach(button => {

        button.onclick = (e) => {

            e.preventDefault();

            e.stopPropagation();

            toggleWishlist(

                Number(

                    button.dataset.id

                )

            );

        };

    });

    /* -----------------------------
       REFRESH TILT
    ----------------------------- */

    if (

        typeof initializeTilt ===

        "function"

    ) {

        initializeTilt();

    }

}
/* ==========================================================
   FILTER PRODUCTS
========================================================== */

function filterProducts() {

    const keyword =

        searchInput

            ? searchInput.value

                .trim()

                .toLowerCase()

            : "";

    const category =

        categoryFilter

            ? categoryFilter.value

            : "All";

    const sort =

        sortFilter

            ? sortFilter.value

            : "default";

    filteredProducts =

        products.filter(product => {

            const matchSearch =

                product.name

                    .toLowerCase()

                    .includes(keyword);

            const matchCategory =

                category === "All"

                ||

                product.category === category;

            return (

                matchSearch

                &&

                matchCategory

            );

        });

    switch (sort) {

        case "low-high":

            filteredProducts.sort(

                (a, b) =>

                    a.price - b.price

            );

            break;

        case "high-low":

            filteredProducts.sort(

                (a, b) =>

                    b.price - a.price

            );

            break;

        case "a-z":

            filteredProducts.sort(

                (a, b) =>

                    a.name.localeCompare(

                        b.name

                    )

            );

            break;

        case "z-a":

            filteredProducts.sort(

                (a, b) =>

                    b.name.localeCompare(

                        a.name

                    )

            );

            break;

    }

    currentPage = 1;

    renderProducts();

}
/* ==========================================================
   EVENTS
========================================================== */

if (searchInput) {

    searchInput.addEventListener(

        "input",

        filterProducts

    );

}

if (categoryFilter) {

    categoryFilter.addEventListener(

        "change",

        filterProducts

    );

}

if (sortFilter) {

    sortFilter.addEventListener(

        "change",

        filterProducts

    );

}

/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        updateCartCount();

        updateWishlistCount();

        filterProducts();

    }

);
