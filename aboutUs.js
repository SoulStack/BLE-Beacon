const profile = document.getElementById('profile');
const dropdown = document.getElementById('dropdown');
// console.log(dropdown)

// document.addEventListener('click' , (e) => {
//     e.preventDefault();
//     console.log(this)
// })

profile.addEventListener('click' , (e) => {
    e.preventDefault();
    currentclick = e.target.matches('#profile')
    if(!currentclick){
        // console.log(1)
        return;
    }

    if(currentclick){
        dropdown.classList.toggle('active');
    }
})

function current_element(event){
    console.log(event.target)
}