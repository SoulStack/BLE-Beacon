// const btn = document.querySelector("#btn");

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

//Landing register
let r_name = document.querySelector('#register-name')
let r_email = document.querySelector('#register-email')
let r_password = document.querySelector('#register-password')
let r_p_confirm = document.querySelector('#register-password-confirm')
const register_form = document.querySelector('#register-form')

register_form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let error_message_element = r_password.parentElement.nextElementSibling;
  let error_meesage2_element = r_p_confirm.parentElement.nextElementSibling;

  error_message_element.classList.add('invisible');

  error_meesage2_element.classList.add('invisible')

  const data = {
    name:r_name.value,
    email:r_email.value,
    password:r_password.value
  };

  const option = {
    method:'POST',
    mode:'cors',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json'
    },
    body:JSON.stringify(data)
  };

  const url = "http://127.0.0.1:3000/registration";

  if(r_password.value == r_p_confirm.value){
    

    fetch(url , option)
    .then(response => response.json())
    .then(json => {
      console.log(json)
    })
    .catch(err => console.log(err))
  } else{
    
    error_message_element.innerText = error_meesage2_element.innerText = 'Password and Confirm Password doesnt matches';
    // console.log(error_message)
    error_message_element.classList.remove('invisible');
    error_meesage2_element.classList.remove('invisible');
    error_message_element.classList.add('error');
    error_meesage2_element.classList.add('error');

  }
})
//Landing Login
let l_email = document.querySelector('#email');
let l_password = document.querySelector("#password");
const login_form = document.querySelector("#login-form")
// console.log(login_form.children.item(3))
login_form.addEventListener("submit", (e)=>{

// http://127.0.0.1:3000/login
  e.preventDefault()
  // const check = inputcheck(password.value , password.type)
  
  const data = {
    email:l_email.value,
    password:l_password.value
  }
  
  const option = {
    method:'POST',
    mode:'cors',
    headers:{
      'Content-type':'application/json'
    },
    credentials:'same-origin',
    body:JSON.stringify(data)
  }

  let url = "http://127.0.0.1:3000/login"

  fetch(url ,option)
  .then(response => response.json())
  .then(json => {
    // console.log(json);
    if(json == 'invalid credentials'){
      console.log("invalid credentials received")
      const l_error_message = login_form.children.item(3);
      
      l_error_message.innerText = `Incorrect mail or password`;
      l_error_message.classList.remove('invisible');
      l_error_message.classList.add('error');
      // console.log(l_error_message)
    } else if(json == 200){
      console.log(json);
      sessionStorage.setItem('userMail', l_email.value);
      
      window.location.href = './dashboard.html';
    }
  })
  .catch(err => console.log(err))
  
})

// function inputcheck(inputval ,type){
//   console.log(inputval , type)
// }