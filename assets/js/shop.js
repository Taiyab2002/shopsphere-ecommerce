const productContainer = document.getElementById("product-list");

const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const sortFilter = document.getElementById("sort-filter");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let filteredProducts = [...products];

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

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) return;

    cartCount.textContent =
        cart.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

}

function updateWishlistCount() {

    const wishlistCount =
        document.getElementById("wishlist-count");

    if (!wishlistCount) return;

    wishlistCount.textContent =
        wishlist.length;

}

function showToast(message) {

    const toastMessage =
        document.getElementById("toast-message");

    if (!toastMessage) return;

    toastMessage.textContent = message;

    const toast = new bootstrap.Toast(

        document.getElementById("cartToast")

    );

    toast.show();

}
function addToCart(id) {

    const product =
        products.find(item => item.id === id);

    if (!product) return;

    const existing =
        cart.find(item => item.id === id);

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

    showToast(product.name + " added to cart!");

}

function isInWishlist(id) {

    return wishlist.some(item => item.id === id);

}

function toggleWishlist(id) {

    const product =
        products.find(item => item.id === id);

    if (!product) return;

    const index =
        wishlist.findIndex(item => item.id === id);

    if (index === -1) {

        wishlist.push(product);

        showToast(product.name + " added to wishlist!");

    } else {

        wishlist.splice(index, 1);

        showToast(product.name + " removed from wishlist!");

    }

    saveWishlist();

    updateWishlistCount();

}
function renderProducts(productArray) {

    if (!productContainer) return;

    productContainer.innerHTML = "";

    if (productArray.length === 0) {

        productContainer.innerHTML = `

        <div class="col-12 text-center py-5">

            <h4>No products found.</h4>

        </div>

        `;

        return;

    }

    productArray.forEach(product => {

       productContainer.innerHTML += `

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

    });
    document.querySelectorAll(".add-cart-btn").forEach(button => {

        button.addEventListener("click", function () {

            addToCart(Number(this.dataset.id));

        });

    });

    document.querySelectorAll(".wishlist-btn").forEach(button => {

        button.addEventListener("click", function (e) {

            e.preventDefault();
            e.stopPropagation();

            const id = Number(this.dataset.id);

            toggleWishlist(id);

            renderProducts(filteredProducts);

        });

    });

}
function filterProducts() {

    const searchValue = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const categoryValue = categoryFilter
        ? categoryFilter.value
        : "All";

    const sortValue = sortFilter
        ? sortFilter.value
        : "default";

    filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchValue);

        const matchesCategory =
            categoryValue === "All" ||
            product.category === categoryValue;

        return matchesSearch && matchesCategory;

    });

    switch (sortValue) {

        case "low-high":

            filteredProducts.sort((a, b) => a.price - b.price);

            break;

        case "high-low":

            filteredProducts.sort((a, b) => b.price - a.price);

            break;

        case "a-z":

            filteredProducts.sort((a, b) =>
                a.name.localeCompare(b.name)
            );

            break;

        case "z-a":

            filteredProducts.sort((a, b) =>
                b.name.localeCompare(a.name)
            );

            break;

    }

    renderProducts(filteredProducts);

    const resultsCount = document.getElementById("results-count");

if(resultsCount){

    resultsCount.textContent =
        `Showing ${filteredProducts.length} Product${filteredProducts.length !== 1 ? "s" : ""}`;

}

}

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

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    updateWishlistCount();

    filterProducts();

});
