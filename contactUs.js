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