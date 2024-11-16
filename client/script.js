const loginForm = document.getElementById('loginForm');
const loginContainer = document.getElementById('loginContainer');
const logoutContainer = document.getElementById('logoutContainer');
const logoutButton = document.getElementById('logoutButton');
const loggedInUserElement = document.getElementById('loggedInUser');

const registrationForm = document.getElementById('registrationForm');
const registrationContainer = document.getElementById('registrationContainer');

const exactUsername = 'lawrenceM'
const exactPassword = 'fred123'

document.addEventListener('DOMContentLoaded', () => {
    /*const admin = document.getElementById('admin').value;*/
    const admin = {firstName: "Lawrence", lastName: "Maina"};
    const myAdmin = JSON.stringify(admin);
    localStorage.setItem("adminName",myAdmin);
    localStorage.getItem("adminName");  
    /*Students use database*/
    
    const student = document.getElementById('student').value;
    student = localStorage.getItem('student');
    });

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    fetch('http://localhost:3306/register', {  // Make sure the URL is correct
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            firstName,
            lastName,
            email
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg === 'Registration successful') {
            alert('Registration successful! Please login.');
            registrationForm.reset(); // Clear the form
            // Optionally, switch to login form
            registrationContainer.style.display = 'none'; // Hide registration form
            loginContainer.style.display = 'block';  // Show login form
        } else {
            alert(data.msg); // Show error message if registration fails
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert('An error occurred during registration.');
    }); 

});

document.addEventListener('DOMContentLoaded', () => { 
    const loggedInUser = localStorage.getItem('loggedInUser')
    const restrictedPages = ['modules.html', 'mail.html', 'grades.html', 'calculator.html'];

    if (!loggedInUser && restrictedPages.includes(window.location.pathname.split('/').pop())) {
    alert('You must be logged in first.');
    window.location.href = 'index.html';
    };

    const restrictedLinks = document.querySelectorAll('nav a[href="modules.html"], nav a[href="mail.html"], nav a[href="grades.html"], nav a[href="calculator.html"]');
    if (!loggedInUser) {
        restrictedLinks.forEach(link => {
            link.style.display = 'none';
        });
    }

    if(loggedInUser){ 
    displayLogOutView(loggedInUser);
    } else{ 
    displayLogInView();
    }
    });

function displayLogInView(){ 
    loginContainer.style.display = 'block';
    logoutContainer.style.display = 'none';
}

function displayLogOutView(username){ 
    loginContainer.style.display = 'none'
    logoutContainer.style.display = 'block'
    loggedInUserElement.textContent = username;
}

loginForm.addEventListener('submit', (event)=>{ 
    event.preventDefault(); 

    const username = document.getElementById('usernme').value;
    const password = document.getElementById('password').value;
    
    fetch('http://localhost:3306/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg === 'Login successful') {
            localStorage.setItem('loggedInUser', JSON.stringify(data.user));

            showLogoutView(data.user.student_first_name);
            loginForm.reset();
        } else {
            alert(data.msg);
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    });

    if(username == exactUsernameusername && password == exactPassword) { 
        localStorage.setItem('loggedInUser',  username);

        displayLogOutView(username);

        loginForm.reset(); 
    } else{ 
        alert('Re-enter login info');
    }

});

logoutButton.addEventListener('click', () => { 
    localStorage.removeItem(loggedInUser);

    displayLogInView();
});