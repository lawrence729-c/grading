/*--experimental-webstorage*/

const loginForm = document.getElementById('loginForm');
const loginContainer = document.getElementById('loginContainer');
const logoutContainer = document.getElementById('logoutContainer');
const logoutButton = document.getElementById('logoutButton');
const loggedInUserElement = document.getElementById('loggedInUser');

const registrationForm = document.getElementById('registrationForm');
const registrationContainer = document.getElementById('registrationContainer');

const exactUsername = 'fred123';
const exactPassword = 'toolbar56';

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const registerUsername = document.getElementById('registerUsername').value;
    const registerPassword = document.getElementById('registerPassword').value;
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

document.addEventListener('DOMContentLoaded', () => { 
const loggedInUser = window.localStorage.getItem('loggedInUser')
const userRole = window.localStorage.getItem('userRole');
const redirectPage = window.localStorage.getItem('redirectPage');

if(loggedInUser){ 
    displayLogOutView(loggedInUser);
    switchViewBasedOnRole(userRole);
} else{ 
    displayLogInView();
}

restrictAccessIfNotLoggedIn();

if (redirectPage) {
    window.location.href = redirectPage;
    window.localStorage.removeItem('redirectPage');
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

function switchViewBasedOnRole(role) {
    if (role === 'admin') {
        /*document.querySelector('.admin-side').style.display = 'block';
        document.querySelector('.student-side').style.display = 'none';*/
    } else if (role === 'student') {
        /*document.querySelector('.admin-side').style.display = 'none';
        document.querySelector('.student-side').style.display = 'block';*/
    }
}

function restrictAccessIfNotLoggedIn() {
    const restrictedPages = ['/modules', '/mail', '/grades', '/calculator'];
    const currentPage = window.location.pathname;

    if (restrictedPages.includes(currentPage)) {
        const loggedInUser = window.localStorage.getItem('loggedInUser');
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
            window.localStorage.setItem('userRole', data.user.role);
            
            alert('You are now logged in');

            displayLogOutView(data.user.student_first_name);
            switchViewBasedOnRole(data.user.role);
            
            const redirectPage = window.localStorage.getItem('redirectPage');
            if (redirectPage) {
                window.location.href = redirectPage;
                window.localStorage.removeItem('redirectPage');
            } else {
                // If they clicked login from the main menu, show a small confirmation message
                alert('You are now logged in');
            }

            loginForm.reset(); 
        } else { 
            alert('Invalid login, please try again');
        }
    })
            /*if(username == exactUsername && password == exactPassword) { 
                window.localStorage.setItem('loggedInUser', username);
                window.localStorage.setItem('userRole', 'admin');

                displayLogOutView(username);
                switchViewBasedOnRole('admin');
                loginForm.reset(); 
            } else{ 
                alert('Invalid login, Re-enter login info');
            }
            displayLogoutView(data.user.student_first_name);
            switchViewBasedOnRole('student');
            loginForm.reset();
        } else {
            alert(data.msg);
        }*/
    .catch(error => {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    });
});

logoutButton.addEventListener('click', () => { 
    window.localStorage.removeItem(loggedInUser);
    window.localStorage.removeItem('userRole');

    displayLogInView();
});

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (event) => {
        const restrictedPages = ['/modules', '/mail', '/grades'];
        const currentPage = link.getAttribute('href');
        
        if (restrictedPages.includes(currentPage)) {
            const loggedInUser = window.localStorage.getItem('loggedInUser');
            if (!loggedInUser) {
                event.preventDefault();  
                alert('You must log in first to access this page.');
                window.location.href = '/login';
            } 
        } 
    });  
});

document.addEventListener('DOMContentLoaded', () => {
    const studentIdList = document.getElementById('student-dropdown');
    const enterIdInput = document.getElementById('enter-id');

    function fetchStudentIDs(){
        fetch('http://localhost:5000/fetchStudentIDs') 
        .then(response => response.json())
        .then(data => {
            studentIdList.innerHTML = ''; 
        data.forEach(studentId => {
          const li = document.createElement('li');
          li.textContent = studentId;
          li.addEventListener('click', () => {
            enterIdInput.value = studentId; 
            studentIdList.style.display = 'none'; 
          });
          studentIdList.appendChild(li);
        });
      })
      .catch(error => console.error('Error fetching student IDs:', error));
  }

    document.getElementById('dropdown-arrow').addEventListener('mouseover', () => {
    fetchStudentIDs(); 
    studentIdList.style.display = 'block';
     });

    document.querySelector('.student-list').addEventListener('mouseleave', () => {
    studentIdList.style.display = 'none';
    //fetchStudentIDs();
    });
});

document.getElementById('home-button').addEventListener('click', () => { 
    window.location.href = '/home';
    });
    
/*document.getElementById('DOMContentLoaded', () => {
const assignments = ondragstart(dragAsssignments(ev));
assignments = ondragover(drop(ev));
});

function dragAsssignments(ev) { 
    ev.dataTransfer.setData("text", ev.target.assignments);
    event.preventDefault
}

function drop(ev){ 
    ev.preventDefault();
    assignments = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(assignments))
}
*/
