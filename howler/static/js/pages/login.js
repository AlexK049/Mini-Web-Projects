import api from "../APIClient.js";

const form = document.querySelector('form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    usernameInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');
    api.login(usernameInput.value, passwordInput.value).then(() => {
        document.location = "/howler";
    }).catch(_ => {
        usernameInput.classList.add('is-invalid');
        passwordInput.classList.add('is-invalid');
    });
});
