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

  document.querySelector(".date h2").innerHTML = months[date.getMonth()];

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
const profile = document.getElementById('profile');
const dropdown = document.getElementById('dropdown');
// console.log(dropdown)

profile.addEventListener('click' , (e)=> {
    // console.log(1)
    e.preventDefault();
    if(dropdown.style.display == 'block'){
        dropdown.style.display = 'none';
    } else {
        // console.log(dropdown.style.display)
        dropdown.style.display = 'block';
    }
})