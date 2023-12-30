window.onload = () => {
    const form = document.querySelector(".main");
    form.classList.add("top-loaded-in");
    const button = document.querySelector(".new-payment-button");
    button.classList.add("bottom-loaded-in");
}
const newPaymentBtn = document.querySelector(".new-payment-button");
newPaymentBtn.addEventListener("click", () => {
    document.location = "/payment-app"
});