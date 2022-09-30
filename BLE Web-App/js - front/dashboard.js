// Fetch get and post request
// //Calendar JS
const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h2").innerText = months[date.getMonth()];

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

//Chart 
const data_asset =  {
          labels: ['Cardiology', 'Gynacology', 'Covid', 'Dental', 'Neurology'],
          datasets: [{
              label: '# of Votes',
              data: [122, 119, 30, 175, 22],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
    };

const data_doctor =  {
          labels: ['Cardiology', 'Gynacology', 'Covid', 'Dental', 'Neurology'],
          datasets: [{
              label: '# of Votes',
              data: [22, 39, 150, 105, 69],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
  };

const data_patient =  {
    labels: ['Cardiology', 'Gynacology', 'Covid', 'Dental', 'Neurology'],
    datasets: [{
        label: '# of Votes',
        data: [74, 99, 430, 245, 32],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};

const config_asset = {
  type: 'doughnut',
  data: data_asset,
  options: {
    responsive: false,
    maintainAspectRatio:false,
    plugins: {
    legend: {
      display:false,
      position:'right'
    }
  }
}
};

const config_doctor = {
  type: 'doughnut',
  data: data_doctor,
  options: {
    responsive: false,
    maintainAspectRatio:false,
    plugins: {
    legend: {
      display:false,
      position:'right'
    }
  }
}
};

const config_patient = {
  type: 'doughnut',
  data: data_patient,
  options: {
    responsive: false,
    maintainAspectRatio:false,
    plugins: {
    legend: {
      display:false,
      position:'right'
    }
  }
}
};

const myChart1 = new Chart(
  document.getElementById('d-chart1'),
  config_asset
);

const myChart2 = new Chart(
  document.getElementById('d-chart2'),
  config_doctor
);

const myChart3 = new Chart(
  document.getElementById('d-chart3'),
  config_patient
);

//Dropdown
const link = document.getElementById('link');
const dropdown = document.getElementById('dropdown');
const data_dropdown = document.querySelector('[data-dropdown].active')
// console.log(dropdown)

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
    patient_form.classList.toggle('dashboard-modal-show')
})

close_icon.addEventListener('click', (e)=> {
    e.preventDefault();
    patient_form.classList.remove('dashboard-modal-show')
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

  let url = "http://127.0.0.1:3000/patient-register";
  
  fetch(url , option)
  .then(response => response.json())
  .then(json => {
    console.log(json);
    patient_name = dept_name.value = beacon_id.value = '';
  })
  .catch(err => console.log(err))
})

//Dashboard Fetches
const beacon_section = document.querySelector('#beacon-section');
const upper_deck = document.querySelector('#upper-deck');
const lower_deck = document.querySelector('#lower-deck');

window.addEventListener('load', (e) => {
  e.preventDefault();
  // Beacon Info
  
  
  // fetch("http://127.0.0.1:3000/calendar-info-section")
  // .then(response => response.json())
  // .then(json => {
  //   console.log(json)
  //   console.log(json.active_beacon);
  //   const return_value = Object.values(json)
    
  //   console.log(return_value)
  //   for( i = 0;i< beacon_section.children.length;i++){
  //     beacon_section.children.item(i).children.item(1).innerText = return_value[i];
  //   }
  // })
  // .catch(err => console.log(err))

  const calendar_fetch = fetch("http://127.0.0.1:3000/calendar-info")
  .then(response => response.json());

  const beacon_fetch = fetch("http://127.0.0.1:3000/beacon-info")
  .then(response => response.json());

  const graph_fetch = fetch("http://127.0.0.1:3000/graph-info")
  .then(response => response.json());

  const allData = Promise.all([calendar_fetch, beacon_fetch,graph_fetch]);

  allData.then(data => {
    // console.log(data)
    calendar_info(data[0])
    beacon_info(data[1])
    graph_info(data[2])
  })

})

function beacon_info(data) {
  // console.log(data)
  const return_value = Object.values(data)
  for( i = 0;i< beacon_section.children.length;i++){
    beacon_section.children.item(i).children.item(1).innerText = return_value[i];
  }
}

function calendar_info(data){
  const d = new Date();  
  
  const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  let day = weekdays[d.getDay()];
  
  upper_deck.children.item(1).children.item(2).innerText = day;
  upper_deck.children.item(2).children.item(2).innerText = day;
  
  const return_value_upper_deck = Object.values(data[1])
  const return_value_lower_deck = Object.values(data[0])
  
  for( i = 0 ;i < upper_deck.children.length;i++ ){
    // console.log(upper_deck.children.item(i).children.item(1).innerText )
    upper_deck.children.item(i).children.item(1).innerText = return_value_upper_deck[i]
  } 
  
  for( i = 0 ;i < lower_deck.children.length;i++ ){
    // console.log(lower_deck.children.item(i).children.item(1).innerText)
    lower_deck.children.item(i).children.item(1).innerText = return_value_lower_deck[i]
  }
}

function graph_info(data){

}
