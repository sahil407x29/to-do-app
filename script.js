const checkBoxList = document.querySelectorAll('.custom-checkbox');
const inputFeilds = document.querySelectorAll('.goal-input');
const error = document.querySelector('.error-label')
const showError = document.querySelector('.show-error')
const progress = document.querySelector('.progress-value')
const label = document.querySelector('.progress-label')
const allQuotes = [
    'Raise the bar by Completing Your Goals',
    'Well begun is half done',
    'Just a step away, keep going',
    'Whoa! You Just Completed all the goals , time for chill :D'
]


// Load saved goals from localStorage OR start with an empty object
let allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

// Count how many goals are marked as completed
const completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length

// Update progress bar width based on completed goals
progress.style.width = `${completedGoalsCount/3 * 100}%`

// Update progress text inside the bar (e.g., "1/3 Completed")
progress.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`

// Show a motivational quote depending on progress
label.innerText = allQuotes[completedGoalsCount];


// For each checkbox, add click behavior
checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener("click",(e) => {

        // Check if ALL goal input fields are filled (no empty goals)
        const allGoalsAdded = [...inputFeilds].every((input)=> {
            return input.value;
        })

        if(allGoalsAdded){
            // Toggle "completed" class on the parent (strike-through effect)
            checkbox.parentElement.classList.toggle('completed')

            // Get the ID of the input linked to this checkbox
            const inputID = checkbox.nextElementSibling.id;

            // Flip the "completed" status of this goal
            allGoals[inputID].completed = !allGoals[inputID].completed

            // Recalculate completed goals count
            const completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length

            // Update progress bar again
            progress.style.width = `${completedGoalsCount/3 * 100}%`
            progress.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`

            // Update motivational text again
            label.innerText = allQuotes[completedGoalsCount];

            // Save updated goals to localStorage
            localStorage.setItem('allGoals',JSON.stringify(allGoals))
        }
        else{
          // Show error if not all input fields are filled
          error.classList.add('show-error')
        }
    })
})


// For each goal input field
inputFeilds.forEach((input)=> {

  // If this goal exists in localStorage, restore its data
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name
    if (allGoals[input.id].completed) {
      input.parentElement.classList.add('completed')
      // restore strike-through if already completed
    }
  }

  // When input gets focus, hide the error message
  input.addEventListener('focus',(e)=>{
      progress.classList.remove('show-error')
  })
    
  // Prevent editing a completed goal
  input.addEventListener('input',(e)=>{
      if(allGoals[input.id] && allGoals[input.id].completed){
           e.target.value = allGoals[input.id].name // reset text back
           return
      }
  })

  // Update goal data whenever user types
  input.addEventListener('input', (e) => {
      if (allGoals[input.id]) {
        allGoals[input.id].name = input.value
        // Update existing goal name
      } else {
        allGoals[input.id] = {
          name: input.value,
          completed: false,
        }
        // Create new goal with default "not completed"
      }

      // Save changes to localStorage
      localStorage.setItem('allGoals', JSON.stringify(allGoals))
  })
})


/*
Array methods explained:

some()
- Checks if at least one element satisfies a condition.
- Returns true if any element passes the test.

every()
- Checks if ALL elements satisfy a condition.
- Returns true only if every element passes the test.
*/
