const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('login');

loginButton.addEventListener('click', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Username and password are required');
        return;
    }

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