document.addEventListener("DOMContentLoaded", () => {
    const loginform = document.querySelector('#loginform');
    const signinform = document.querySelector('#signinform');

    document.querySelector('#login-form-link').addEventListener('click', (e) => {
        e.preventDefault();
        signinform.classList.add('form-hidden');
        loginform.classList.remove('form-hidden');
    })

    document.querySelector('#register-form-link').addEventListener('click' , (e) => {
        e.preventDefault();
        loginform.classList.add('form-hidden');
        signinform.classList.remove('form-hidden');
    })
})