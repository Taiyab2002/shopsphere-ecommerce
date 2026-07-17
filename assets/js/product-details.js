const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

const product = products.find(item => item.id === productId);

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let quantity = 1;

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

}

if (!product) {

    document.body.innerHTML = `

    <div class="container py-5 text-center">

        <h2>Product Not Found</h2>

        <a href="shop.html" class="btn btn-primary mt-3">

            Back to Shop

        </a>

    </div>

    `;

    throw new Error("Invalid Product ID");

}
document.getElementById("product-image").src = product.image;

document.getElementById("product-name").textContent = product.name;

document.getElementById("product-price").textContent =
"$" + product.price.toFixed(2);

document.getElementById("product-description").textContent =
product.description;

document.getElementById("full-description").textContent =
product.description;

document.getElementById("product-brand").textContent =
product.brand;

document.getElementById("spec-brand").textContent =
product.brand;

document.getElementById("spec-category").textContent =
product.category;

document.getElementById("spec-rating").textContent =
product.rating + " ★";

document.getElementById("spec-reviews").textContent =
product.reviews;

document.getElementById("product-review").textContent =
product.rating + " (" + product.reviews + " Reviews)";

let stars = "";

const fullStars = Math.floor(product.rating);

for (let i = 0; i < fullStars; i++) {

    stars += '<i class="fas fa-star"></i>';

}

if (product.rating % 1 >= 0.5) {

    stars += '<i class="fas fa-star-half-alt"></i>';

}

document.getElementById("product-rating").innerHTML = stars;
const quantityInput = document.getElementById("quantity");

document.getElementById("plus-btn").addEventListener("click", () => {

    quantity++;

    quantityInput.value = quantity;

});

document.getElementById("minus-btn").addEventListener("click", () => {

    if (quantity > 1) {

        quantity--;

        quantityInput.value = quantity;

    }

});

quantityInput.addEventListener("change", () => {

    quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {

        quantity = 1;

    }

    quantityInput.value = quantity;

});

document.getElementById("add-cart-btn").addEventListener("click", () => {

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({

            ...product,

            quantity: quantity

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart!");

});

updateCartCount();