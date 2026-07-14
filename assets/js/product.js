const quantityInput = document.getElementById("quantity");
const increaseBtn = document.getElementById("increaseQty");
const decreaseBtn = document.getElementById("decreaseQty");

increaseBtn.addEventListener("click", () => {
    quantityInput.value = Number(quantityInput.value) + 1;
});

decreaseBtn.addEventListener("click", () => {
    if (Number(quantityInput.value) > 1) {
        quantityInput.value = Number(quantityInput.value) - 1;
    }
});