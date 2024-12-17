    // Submit the grade entered by the admin
    gradeSubmitButton.addEventListener('click', () => {
        const studentId = enterIdInput.value;
        const grade = gradeInput.value;

        if (studentId && grade) {
            fetch('http://localhost:5000/submitGrade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: studentId,
                    grade: grade,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.msg === 'Grade submitted successfully') {
                        alert('Grade submitted successfully!');
                    } else {
                        alert('Failed to submit grade.');
                    }
                })
                .catch(error => {
                    console.error('Error submitting grade:', error);
                    alert('An error occurred while submitting the grade.');
                });
        } else {
            alert('Please enter a valid student ID and grade.');
        }
    });

    // Initialize the student IDs dropdown
    //Check html file and element are related(menu.html)
    document.getElementById('dropdown-arrow').addEventListener('mouseover', () => {
        fetchStudentIDs();
        studentIdList.style.display = 'block';
    });

    // Hide dropdown when mouse leaves
    //Check html file and element are related(menu.html)
    document.querySelector('.student-list').addEventListener('mouseleave', () => {
        studentIdList.style.display = 'none';
    });

function submitGrade() {
    const assignmentID = document.getElementById('assignmentID').value;
    const studentID = document.getElementById('studentID').value;
    const grade = document.getElementById('grade').value;
    
    if (!assignmentID || !studentID || !grade) {
        alert("Please fill in all fields.");
        return;
    }

    fetch('/submit-grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignmentID, studentID, grade })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.msg);
        })
        .catch(error => {
            console.error('Error submitting grade:', error);
            alert('An error occurred while submitting the grade.');
        });
}

function publishGrades() {
    // Get student name and ID
    const studentName = document.getElementById('studentname-id').value;
    if (!studentName) {
        alert("Please enter the student's name or ID.");
        return;
    }

    // Get the grades for each assignment
    const grades = {
        assignment1: document.getElementById('grade-assignment1').value,
        assignment2: document.getElementById('grade-assignment2').value,
        assignment3: document.getElementById('grade-assignment3').value,
        assignment4: document.getElementById('grade-assignment4').value,
        assignment5: document.getElementById('grade-assignment5').value,
        assignment6: document.getElementById('grade-assignment6').value
    };

    /* Validate that all grades are entered
    if (Object.values(grades).includes("")) {
        alert("Please enter grades for all assignments.");
        return;
    }*/

    const avgGrade = document.getElementById('avg-grade').value;
    if (!avgGrade) {
        alert("Please enter the average grade.");
        return;
    }

    // Save the grades to localStorage or database (for now using localStorage)
    let allGrades = JSON.parse(localStorage.getItem('studentGrades')) || {};

    // If the student already has grades, append new ones
    if (allGrades[studentName]) {
        allGrades[studentName].grades = grades;
        allGrades[studentName].avgGrade = avgGrade;
    } else {
        // If no grades exist for this student, create a new entry
        allGrades[studentName] = { grades, avgGrade };
    }

    // Save to localStorage for viewing later
    localStorage.setItem('studentGrades', JSON.stringify(allGrades));

    // Redirect to view grades page or show confirmation
    window.location.href = '/view-grades.html';  // You can replace this with a modal or a different page
    window.location.href = '/counselorview-grades.html';
}


/* After login, store the studentID in localStorage
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg === 'Login successful') {
            // Store the studentID in localStorage
            localStorage.setItem('studentID', data.user.id);
            window.location.href = '/grades.html'; // Redirect to the grades page
        } else {
            alert('Login failed');
        }
    })
    .catch(error => {
        console.error('Error logging in:', error);
        alert('An error occurred during login');
    });
}

Fetch grades for the logged-in student
document.addEventListener('DOMContentLoaded', function() {
    const studentID = localStorage.getItem('studentID');

    if (studentID) {
        fetch(`http://localhost:5000/get-grades/${studentID}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const gradesContainer = document.getElementById('grades-container');
                    gradesContainer.innerHTML = ''; // Clear any existing grades

                    data.forEach(grade => {
                        const gradeElement = document.createElement('div');
                        gradeElement.classList.add('grade-item');
                        gradeElement.innerHTML = `<strong>${grade.assignments_name}</strong>: ${grade.student_grade}`;
                        gradesContainer.appendChild(gradeElement);
                    });
                } else {
                    alert('No grades found for this student');
                }
            })
            .catch(error => {
                console.error('Error fetching grades:', error);
                alert('An error occurred while fetching grades');
            });
    } else {
        alert('Student not logged in');
    }
});


/*function changeStatus(assignmentID, studentID, assignmentStatus){ 
    fetch('/update-status', { 
        method: 'POST',
        headers: { 
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ 
            assignmentID: assignmentID, 
            studentID: studentID,
            assignmentStatus: assignmentStatus
        }) 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.msg);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}*/