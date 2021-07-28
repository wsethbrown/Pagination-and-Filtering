/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const studentsPerPage = 9
// Function to create the student information

function showPage(list, page) {
   let startPage = (page * studentsPerPage) - studentsPerPage
   let endPage = page * studentsPerPage
   let studentList = document.querySelector(".student-list") //create variable to store our proper HTML element
   studentList.innerHTML = '' //empty the HTML element before filling it with a For loop
   //iterate through the list parameter and fill in appropriate data to our created HTML elements
   for (i = 0; i < list.length; i++) {
      if(i >= startPage && i < endPage) {
         let studentInfo = 
         `<li class="student-item cf">
            <div class="student-details">
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>`
      //Display the newly created elements on the page, inside the studentInfo innerHTML
      studentList.insertAdjacentHTML("beforeend", studentInfo);
      }
   }  
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   const maxPages = Math.ceil(list.length/studentsPerPage)
   let linkList = document.querySelector(".link-list")
   linkList.innerHTML = ''
   for (i = 0; i < maxPages; i++) {
      let pageButtons = 
      `<li>
         <button type="button">${i+1}</button>
      </li>`
    linkList.insertAdjacentHTML("beforeend", pageButtons)
   }

   // select the first button in the array and give it the Active class
   linkList.getElementsByTagName('button').length > 0 ? linkList.getElementsByTagName('button')[0].classList.add("active") : linkList.innerHTML = ''


   linkList.addEventListener("click", event => {
      if (event.target.matches('button')) {
         // Call the showPage function when a button is clicked.
         // Pass in "list" from addPagination function parameter and the # that's in the button's Text Content
         // to provide showPage()'s required parameters
         showPage(list, event.target.textContent)

         // Remove Active class from all buttons before we apply it to the clicked button
         let nonActiveButtons = document.getElementsByTagName('button')
         for (let i = 0; i < nonActiveButtons.length; i++) {
            nonActiveButtons[i].classList.remove("active")
         }

         //Add the active button to the clicked button
         event.target.classList.add("active")
      }
   })
}

// Insert HTML for searchbar
function searchBar() {
   const header = document.querySelector('.header')
   const searchBarHTML =
   `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button id="searchButton" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`
   header.insertAdjacentHTML("beforeend", searchBarHTML)
}

// Call the searchbar
searchBar()

const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('#searchButton');
// console.log(searchButton)

// Handle input from searchBar
function searchFunction(searchInput, students) {
   let filteredStudents = [] //create a blank array of students that will be used to display matching search results

   // loop through all students, searching for matching letters in students names
   for (let i = 0; i < students.length; i++) {
      // make it easier on ourselves, concat first and last names into one variable and compare against that
      let fullName = `${students[i].name.first} ${students[i].name.last}`
     if (searchInput.value.length !== 0 && fullName.toLowerCase().includes(searchInput.value.toLowerCase())) {
         filteredStudents.push(students[i]) //add any matches to the empty array
      }
   }

   // if there are any students in the array, show them on the page using showPage function and add pagination using ///////////addPagination function
   if (filteredStudents.length > 0) {
      //See if the error message is currently on the page
      //displayError() checks if the error message "No Students Found" is displayed on the page. If it is, it's removed
      displayError()
         showPage(filteredStudents, 1  )
         addPagination(filteredStudents)
         showedError = false //Reset the boolean so that if we input a search that returns no results, we see the error message again
      // if there are no characters in the search box, display default page. Useful if user deletes all characters
   } else if (searchInput.value.length === 0) {
      //displayError() checks if the error message "No Students Found" is displayed on the page. If it is, it's removed
      displayError()
      showPage(data, 1)
      addPagination(data)
   } else {
      // if no results are found, show the Error function and show blank students with showPage, and show no pagination with addPagination
      showErrorOnce()
      showPage(filteredStudents)
      addPagination(filteredStudents)
   }
 }

// Display results after user clicks the submit button on their search
searchButton.addEventListener("click", event => {
   event.preventDefault()
   searchFunction(searchInput, data)
})

// Add a keyup listener to create a more responsive app, showing results instantly as user types
searchInput.addEventListener("keyup", event => {
   event.preventDefault()
   searchFunction(searchInput, data)
})


// Error handling if there are no results
let showedError = false //Set variable to false because we haven't called showError yet

// Check to see if we have set showedError to true, if not, call showError function
function showErrorOnce() {
   if (!showedError) showError()
}

// Insert HTML into page if no results are found in search
function showError() {
   const noResults = `<h3 id="error-message">No results found</h3>`
   let noResultsPage = document.querySelector(".header")
   noResultsPage.insertAdjacentHTML("afterend", noResults)
   showedError = true
}

//displayError() checks if the error message "No Students Found" is displayed on the page. If it is, it's removed
function displayError() {
   if (document.querySelector('.page > h3')) {
      let parentNode = document.querySelector('.page')
      let childNode = document.querySelector('.page > h3')
      parentNode.removeChild(childNode)
   }
}
// Call functions
showPage(data,1)
addPagination(data)

