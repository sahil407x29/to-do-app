const checkBoxList = document.querySelectorAll('.custom-checkbox');
const inputFeilds = document.querySelectorAll('.goal-input');
const error = document.querySelector('.error-label')
const showError = document.querySelector('.show-error')
const progress = document.querySelector('.progress-bar')

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener("click",(e) => {
        const allGoalsAdded = [...inputFeilds].every((input)=> {
            return input.value;
        })
        if(allGoalsAdded){
        checkbox.parentElement.classList.toggle('completed')
        }
        else{
          progress.classList.add('show-error')
        }
    })
})

inputFeilds.forEach((input)=> {
    input.addEventListener('focus',(e)=>{
        progress.classList.remove('show-error')

    })
})

// some()
// Purpose: Tests whether at least one element in the array satisfies the provided condition.
// Returns: true if any element passes the test; otherwise, false.

// every()
// Purpose: Tests whether all elements in the array satisfy the provided condition.
// Returns: true if all elements pass the test; otherwise, false.