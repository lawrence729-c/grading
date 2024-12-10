/*const userRole = window.localStorage.getItem('userRole');
const loggedInUser = window.localStorage.getItem('loggedInUser');
const redirectPage = window.localStorage.getItem('redirectPage');
const loginContainer = document.getElementById('loginContainer');
const logoutContainer = document.getElementById('logoutContainer');
const loggedInUserElement = document.getElementById('loggedInUser');

if(loggedInUser){ 
    displayLogOutView(loggedInUser); 
    if (userRole === 'admin') {
        document.querySelector('.menu-admin-side').style.display = 'block';
        document.querySelector('.menu-student-side').style.display = 'none';
        document.querySelector('.menu-counselor-side').style.display = 'none';

    } else if (userRole === 'student') {
        document.querySelector('.menu-admin-side').style.display = 'none';
        document.querySelector('.menu-student-side').style.display = 'block';
        document.querySelector('.menu-counselor-side').style.display = 'none';

    }
    else if(userRole === 'counselor') { 
        document.querySelector('.menu-admin-side').style.display = 'none';
        document.querySelector('.menu-student-side').style.display = 'none';
        document.querySelector('.menu-counselor-side').style.display = 'block';
    }
} 
else{ 
    displayLogInView();
}

if (redirectPage) {
    window.location.href = '/menu';
    window.localStorage.removeItem('/menu');
}

function displayLogInView(){ 
    loginContainer.style.display = 'block';
    logoutContainer.style.display = 'none';
}

function displayLogOutView(username){ 
    loginContainer.style.display = 'none';
    logoutContainer.style.display = 'block';
    loggedInUserElement.textContent = username;
}*/

function restrictAccessIfNotLoggedIn() {
    const restrictedPages = ['/modules', '/mail', '/grades'];
    const currentPage = window.location.pathname;

    if (restrictedPages.includes(currentPage)) {
        const loggedInUser = window.localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            alert('You must log in first');
            window.location.href = '/login';
        }
    }
}

restrictAccessIfNotLoggedIn();

document.addEventListener('DOMContentLoaded', () => {
    const studentIdList = document.getElementById('student-dropdown');
    const enterIdInput = document.getElementById('enter-id');
    const dropdownButton = document.getElementById('dropdown-button');
    
    function fetchStudentIDs(inputValue) {
        const studentIdList = document.querySelector('.student-list');
        fetch('http://localhost:5000/fetchStudentIDs')  // Adjust this endpoint as needed
        .then(response => response.json())
        .then(data => {
            studentIdList.innerHTML = ''; // Clear previous list
            // Filter the IDs based on the input
            const filteredStudentIds = data.filter(studentId => 
                studentId.toLowerCase().includes(inputValue.toLowerCase())
            );
            
            filteredStudentIds.forEach(studentId => {
                const li = document.createElement('li');
                li.textContent = studentId;
                li.addEventListener('click', () => {
                    enterIdInput.value = studentId;
                    studentIdList.style.display = 'none';  // Hide the dropdown when an ID is selected
                });
                studentIdList.appendChild(li);
            });
            // If no matches, show a message
            if (filteredStudentIds.length === 0) {
                const li = document.createElement('li');
                li.textContent = 'No matching student IDs found.';
                studentIdList.appendChild(li);
            }
            studentIdList.style.display = 'block';  // Show the list
        })
        .catch(error => console.log('Error fetching student IDs:', error));
    }

    // When the button is clicked, fetch and display the filtered student IDs
    dropdownButton.addEventListener('click', () => {
        const inputValue = enterIdInput.value;  // Get the value entered by the user
        if (inputValue) {
            fetchStudentIDs(inputValue);
        } else {
            alert('Please enter a student ID to search.');
        }
    });

    // Optional: Close the dropdown if the user clicks outside the list
    document.addEventListener('click', (event) => {
        if (!studentIdList.contains(event.target) && event.target !== dropdownButton) {
            studentIdList.style.display = 'none';
        }
    });
});
    
    const homeButton = document.getElementById('home-button');
    if(homeButton){
    window.location.href = '/home'; 
    }
