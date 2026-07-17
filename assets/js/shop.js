const productContainer = document.getElementById("product-list");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {

        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    }

}

function addToCart(id) {

    const product = products.find(item => item.id === id);

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart!");

}

if (productContainer) {

    products.forEach(product => {

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

updateCartCount();