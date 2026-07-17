let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");
const cartCount = document.getElementById("cart-count");

function updateCartCount() {

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

}

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <i class="fas fa-shopping-cart"></i>

                <h3>Your cart is empty</h3>

                <p>Add some amazing products to your cart.</p>

                <a href="shop.html" class="btn btn-primary mt-3">
                    Continue Shopping
                </a>

            </div>
        `;

        subtotal.textContent = "$0.00";
        total.textContent = "$0.00";

        updateCartCount();

        return;
    }

    cartItems.innerHTML = "";

    let grandTotal = 0;

        cart.forEach(item => {

        grandTotal += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="card cart-item">

            <div class="card-body">

                <div class="d-flex align-items-center">

                    <img src="${item.image}" alt="${item.name}">

                    <div class="cart-info ms-3">

                        <h5>${item.name}</h5>

                        <p>$${item.price.toFixed(2)}</p>

                    </div>

                </div>

                <div class="quantity-control">

                    <button onclick="decreaseQuantity(${item.id})">−</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">+</button>

                </div>

                <div>

                    <strong>

                        $${(item.price * item.quantity).toFixed(2)}

                    </strong>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeItem(${item.id})">

                    <i class="fas fa-trash"></i>

                </button>

            </div>

        </div>

        `;

    });

    subtotal.textContent = "$" + grandTotal.toFixed(2);
    total.textContent = "$" + grandTotal.toFixed(2);

    updateCartCount();

}

renderCart();

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

}

function increaseQuantity(id) {

    const item = cart.find(product => product.id === id);

    if (item) {

        item.quantity++;

        saveCart();

    }

}

function decreaseQuantity(id) {

    const item = cart.find(product => product.id === id);

    if (item) {

        if (item.quantity > 1) {

            item.quantity--;

        } else {

            cart = cart.filter(product => product.id !== id);

        }

        saveCart();

    }

}

function removeItem(id) {

    cart = cart.filter(product => product.id !== id);

    saveCart();

}

