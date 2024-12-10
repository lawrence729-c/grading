const registrationForm = document.getElementById('registrationForm');
const registrationContainer = document.getElementById('registrationContainer');

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const registerUsername = document.getElementById('registerUsername').value;
    const registerPassword = document.getElementById('registerPassword').value;
    //const repeatPassword = document.getElementById('repeatPassword').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    fetch('http://localhost:5000/register', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: registerUsername,
            password: registerPassword,
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