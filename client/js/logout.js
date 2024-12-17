const logoutButton = document.getElementById('logoutButton');
const loginContainer = document.getElementById('loginContainer');
const loggedInUserElement = document.getElementById('loggedInUser');

function displayLogOutView(username){ 
    loginContainer.style.display = 'none';
    logoutContainer.style.display = 'block';
    loggedInUserElement.textContent = username;
}

