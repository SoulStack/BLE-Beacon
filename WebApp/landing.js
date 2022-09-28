let email = document.querySelector('#email');
let password = document.querySelector("#password");
const btn = document.querySelector("#btn");
const login_form = document.querySelector("#login-form")

// console.log(email.type)

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

login_form.addEventListener("submit", (e)=>{
// https://jsonplaceholder.typicode.com/posts
// http://127.0.0.1:3000/login
  e.preventDefault()
  // const check = inputcheck(password.value , password.type)
  
  const data = {
    email:email.value,
    password:password.value
  }
  
  const option = {
    method:'POST',
    mode:'cors',
    headers:{
      'Content-type':'application/json'
    },
    credentails:'same-origin',
    body:JSON.stringify(data)
  }

  let url = "http://127.0.0.1:3000/login"

  fetch(url ,option)
  .then(response => response.json())
  .then(json => {
    console.log(json);
    // sessionStorage.setItem('userMail', email_value);
    // window.location.href = './dashboard.html'
  })
  .catch(err => console.log(err))
  
})

// function inputcheck(inputval ,type){
//   console.log(inputval , type)
// }