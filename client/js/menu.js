const userRole = window.localStorage.getItem('userRole');
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
}

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
