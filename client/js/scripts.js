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
const admin = document.getElementById('admin').value;
admin = localStorage.getItem('admin');  

const student = document.getElementById('student').value;
student = localStorage.getItem('student');
});

const student = document.getElementById('student').value;
student = localStorage.getItem('student');

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    fetch('http://localhost:3306/register', { 
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
            registrationForm.reset();
            registrationContainer.style.display = 'none';
            loginContainer.style.display = 'block'; 
        } else {
            alert(data.msg);
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert('An error occurred during registration.');
    }); 

});

document.addEventListener('DOMContentLoaded', () => { 
const loggedInUser = localStorage.getItem('loggedInUser')

if(loggedInUser){ 
    displayLogOutView(loggedInUser);
} else{ 

    displayLogInView();
}

restrictAccessIfNotLoggedIn();
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

function restrictAccessIfNotLoggedIn() {
    const restrictedPages = ['/modules', '/mail', '/grades', '/calculator'];
    const currentPage = window.location.pathname;

    if (restrictedPages.includes(currentPage)) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            alert('You must log in first');
            window.location.href = '/login';
        }
    }
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

    if(username == exactUsername && password == exactPassword) { 
        localStorage.setItem('loggedInUser',  username);

        displayLogOutView(username);

        loginForm.reset(); 
    } else{ 
        alert('Invalid login, Re-enter login info');
    }
});

loginForm.addEventListener('click', (event)=>{  
    const otherOptions = ["/modules", "mail", "grades", "calculator" ];
    if(!loggedInUser.click(otherOptions)) { 
        alert('You must login first');
    }
});

logoutButton.addEventListener('click', () => { 
    localStorage.removeItem(loggedInUser);

    displayLogInView();
});

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (event) => {
        const restrictedPages = ['/modules', '/mail', '/grades', '/calculator'];
        const currentPage = link.getAttribute('href');
        
        if (restrictedPages.includes(currentPage)) {
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (!loggedInUser) {
                event.preventDefault();  
                alert('You must log in first to access this page.');
                window.location.href = '/login';
            } 
        } 
    }); 
});
