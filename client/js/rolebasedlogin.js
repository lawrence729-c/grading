const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('login');
const logoutButton = document.getElementById('logout');
const logoutButton2 = document.getElementById('logout2');


loginButton.addEventListener('click', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Username and password are required');
        return;
    }

    fetch('http://localhost:5000/admin-login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg === 'Login successful') {
            console.log('Username:', username);
            console.log('Password:', password);
            // Store user info (can also store in session/local storage)
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            alert(data.msg);
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        alert('Error occurred during login');
    });
});

loginButton.addEventListener('click', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Username and password are required');
        return;
    }

    // Make an API call based on the user type
    fetch('http://localhost:5000/student-login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg === 'Login successful') {
            console.log('Username:', username);
            console.log('Password:', password);
            // Store user info (can also store in session/local storage)
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            alert(data.msg);
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        alert('Error occurred during login');
    });
});

loginButton.addEventListener('click', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Username and password are required');
        return;
    }

    // Make an API call based on the user type
    fetch('http://localhost:5000/counselor-login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg === 'Login successful') {
            console.log('Username:', username);
            console.log('Password:', password);
            // Store user info (can also store in session/local storage)
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            alert(data.msg);
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        alert('Error occurred during login');
    });
});

logoutButton.addEventListener('click', function(event) {
    // Clear the stored user data and hide the logged-in content
    localStorage.removeItem('user');
    document.getElementById('admin-container').style.display = 'none';
    document.getElementById('student-container').style.display = 'none';
    document.getElementById('counselor-container').style.display = 'none';

});

logoutButton2.addEventListener('click', function(event) {
    // Clear the stored user data and hide the logged-in content
    localStorage.removeItem('user');
    document.getElementById('admin-container').style.display = 'none';
    document.getElementById('student-container').style.display = 'none';
    document.getElementById('counselor-container').style.display = 'none';

});

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {

        // Hide all containers
        document.getElementById('admin-container').style.display = 'none';
        document.getElementById('student-container').style.display = 'none';
        document.getElementById('counselor-container').style.display = 'none';
        
        // Show the appropriate container based on the role
        if (user.role === 'admin') {
            document.getElementById('admin-container').style.display = 'block';
        } else if (user.role === 'student') {
            document.getElementById('student-container').style.display = 'block';
            document.getElementById('index-login').style.display = 'none';
        } else if (user.role === 'counselor') {
            document.getElementById('counselor-container').style.display = 'block';
            document.getElementById('index-login').style.display = 'none';
        }
        else{ 
            document.getElementById('container').style.display = 'block';
        }
    }
});