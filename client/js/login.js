const loginForm = document.getElementById('loginForm');
const loginContainer = document.getElementById('loginContainer');
const logoutContainer = document.getElementById('logoutContainer');
const logoutButton = document.getElementById('logoutButton');
const loggedInUserElement = document.getElementById('loggedInUser');

//Email Verification if user can't sign in
const emailVerifier = "Email Verified"

document.addEventListener('DOMContentLoaded', () => { 
    const loggedInUser = window.localStorage.getItem('loggedInUser');
   
    /*if(loggedInUser){ 
        displayLogOutView(loggedInUser);
    } else{ 
        displayLogInView();
    }*/

    loginForm.addEventListener('submit', (event)=>{ 
        event.preventDefault(); 
        console.log("Logging in");

        const username = document.getElementById('usernme').value;
        const password = document.getElementById('password').value;
        
        fetch('http://localhost:5000/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.msg === 'Login successful') {
                window.localStorage.setItem('loggedInUser', JSON.stringify(data.user));
                console.log('Login successful')
            } else { 
                alert('Invalid login, please try again');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('An error occurred during login.');
        });
    });
    
    /*logoutButton.addEventListener('click', () => { 
        window.localStorage.removeItem(loggedInUser);    
        displayLogInView();
    });
});

    function displayLogInView(){ 
        loginContainer.style.display = 'block';
        logoutContainer.style.display = 'none';
    }*/
    
    function displayLogOutView(username){ 
        loginContainer.style.display = 'none';
        logoutContainer.style.display = 'block';
        loggedInUserElement.textContent = username;
    }
});