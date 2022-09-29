const close_icon = document.querySelector("#close_icon")
const icon = document.querySelector('#icon')
const patient_form = document.querySelector('#patient-register-form')
const card = document.querySelector('#card')
// console.log(patient_form)
icon.addEventListener('click', (e)=> {
    e.preventDefault();
    card.classList.toggle('showcase-show')
})

close_icon.addEventListener('click', (e)=> {
    e.preventDefault();
    card.classList.remove('showcase-show')
})

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