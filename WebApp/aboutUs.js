const link = document.getElementById('link');
const dropdown = document.getElementById('dropdown');

link.addEventListener('click', function(e){
  const isDropButton = e.target.matches('#link')
  if(!isDropButton && e.target.closest('[data-dropdown]') != null) return
  
  if(isDropButton){
    dropdown.classList.toggle('active')  
  }
})

// Modal Form
const close_icon = document.querySelector("#close_icon")
const icon = document.querySelector('#icon')
const patient_form = document.querySelector('#register-patient-card')

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