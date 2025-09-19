const checkBoxList = document.querySelectorAll('.custom-checkbox');
const inputFeilds = document.querySelectorAll('.goal-input');
const error = document.querySelector('.error-label')
const showError = document.querySelector('.show-error')
const progress = document.querySelector('.progress-value')



// let allGoals = {
//    first : {
//     name: "",
//     completed: ""
//    },
//    second : {
//     name :'',
//     completed: ""
//    },
//    third : {
//     name : '',
//     completed : ''
//    }
// }

let allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
const completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length
progress.style.width = `${completedGoalsCount/3 * 100}%`

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener("click",(e) => {
        const allGoalsAdded = [...inputFeilds].every((input)=> {
            return input.value;
        })
        // this
        if(allGoalsAdded){
        checkbox.parentElement.classList.toggle('completed')
        const inputID = checkbox.nextElementSibling.id;
        allGoals[inputID].completed = !allGoals[inputID].completed
        const completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length
        progress.style.width = `${completedGoalsCount/3 * 100}%`
        localStorage.setItem('allGoals',JSON.stringify(allGoals))
        }
        else{
          progress.classList.add('show-error')
        }
    })
})

inputFeilds.forEach((input)=> {
    // that
    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }
    if (allGoals[input.id]) {
        input.value = allGoals[input.id].name;
    }
    
    // console.log(allGoals[input.id])
    input.addEventListener('focus',(e)=>{
        progress.classList.remove('show-error')

    })

    input.addEventListener('input', (e) => {
        // allGoals[e.target.id]= e.target.value;
     
        allGoals[e.target.id] = { 
            name : e.target.value,
            completed : false

        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
        // console.log(allGoals)
    
    })
})




// some()
// Purpose: Tests whether at least one element in the array satisfies the provided condition.
// Returns: true if any element passes the test; otherwise, false.

// every()
// Purpose: Tests whether all elements in the array satisfy the provided condition.
// Returns: true if all elements pass the test; otherwise, false.