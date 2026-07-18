const productContainer = document.getElementById("product-list");

const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const sortFilter = document.getElementById("sort-filter");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let filteredProducts = [...products];

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

}

function showToast(message) {

    const toastMessage = document.getElementById("toast-message");

    toastMessage.textContent = message;

    const toast = new bootstrap.Toast(
        document.getElementById("cartToast")
    );

    toast.show();

}

function addToCart(id) {

    const product = products.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    showToast(product.name + " added to cart!");

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

            <div class="card product-card h-100">

                <img src="${product.image}"
                     class="card-img-top"
                     alt="${product.name}">

                <div class="card-body text-center">

                    <h5 class="card-title">

                        ${product.name}

                    </h5>

                    <p class="text-muted">

                        $${product.price.toFixed(2)}

                    </p>

                    <div class="d-grid gap-2">

                        <a href="product.html?id=${product.id}"
                           class="btn btn-outline-primary">

                            View Details

                        </a>

                        <button
                            class="btn btn-primary add-cart-btn"
                            data-id="${product.id}">

                            Add to Cart

                        </button>

                    </div>

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

}
function filterProducts() {

    const searchValue = searchInput.value.trim().toLowerCase();

    const categoryValue = categoryFilter.value;

    const sortValue = sortFilter.value;

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

        default:

            break;

    }

    renderProducts(filteredProducts);

}
if (searchInput) {

    searchInput.addEventListener("input", filterProducts);

}

if (categoryFilter) {

    categoryFilter.addEventListener("change", filterProducts);

}

if (sortFilter) {

    sortFilter.addEventListener("change", filterProducts);

}

updateCartCount();

renderProducts(products);