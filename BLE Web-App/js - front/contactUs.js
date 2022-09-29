const link = document.getElementById('link');
const dropdown = document.getElementById('dropdown');
// console.log(dropdown)

link.addEventListener('click', function(e){
  const isDropButton = e.target.matches('#link')
  if(!isDropButton && e.target.closest('[data-dropdown]') != null) return
  
  if(isDropButton){
    dropdown.classList.toggle('active')  
  }
})

//Toggling Modal
icon.addEventListener('click', (e)=> {
  e.preventDefault();
  patient_form.classList.toggle('modal-show')
})

close_icon.addEventListener('click', (e)=> {
  e.preventDefault();
  patient_form.classList.remove('modal-show')
})

//Submitting modal data to backend
patient_form.addEventListener('submit', (e)=> {
e.preventDefault();

let patient_name = document.getElementById('p-name')
let dept_name = document.getElementById('p-dept')
let beacon_id = document.getElementById('b-id')

const data = {
    name:patient_name.value,
    dept:dept_name.value,
    beacon_id:beacon_id.value
}

const option = {
    method:'POST',
    mode: 'cors',
    headers:{
        'Content-type':'application/json'
    },
    credentials: 'same-origin',
    body:JSON.stringify(data)
};

// let url = "http://localhost:3000/patient-register";
let url = "http://127.0.0.1:3000/patient-register";

fetch(url , option)
.then(response => response.json())
.then(json => console.log(json))
.catch(err => console.log(err))
})

//Contact Form
let c_name = document.querySelector('#contact-name');
let c_email = document.querySelector('#contact-email');
let c_phone = document.querySelector('#contact-phone');
let c_message = document.querySelector('#contact-message');
const contact_form = document.querySelector('#contact-form');

contact_form.querySelector('submit', (e)=> {
  e.preventDefault();

  const data = {
    name:patient_name.value,
    email:dept_name.value,
    phone:beacon_id.value
}

const option = {
    method:'POST',
    mode: 'cors',
    headers:{
        'Content-type':'application/json'
    },
    credentials: 'same-origin',
    body:JSON.stringify(data)
};

// let url = "http://localhost:3000/patient-register";
let url = "http://127.0.0.1:3000/patient-register";

fetch(url , option)
.then(response => response.json())
.then(json => console.log(json))
.catch(err => console.log(err))
})