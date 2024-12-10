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

/* document.addEventListener('DOMContentLoaded', function() {
    const dropdownArrow = document.getElementById('dropdown-arrow');
    const studentIdList = document.querySelector('.student-id-list');

    if (dropdownArrow) {
        dropdownArrow.addEventListener('click', function() {
            console.log('Dropdown arrow clicked!');
            fetchStudentIDs();
            studentIdList.style.display = 'block';  // Show the list when clicked
        });
    } else {
        console.log('Dropdown arrow not found!');
    }
});*/

// Student side - View grades functionality
document.addEventListener('DOMContentLoaded', () => {
    const studentId = window.localStorage.getItem('loggedInUser'); // Assuming logged-in user ID is saved in localStorage
    const gradeView = document.getElementById('grade-container-student');

    if (studentId) {
        fetch(`http://localhost:5000/getGrade/${studentId}`)
            .then(response => response.json())
            .then(data => {
                if (data.grade) {
                    gradeView.innerHTML = `Your grade: ${data.grade}`;
                } else {
                    gradeView.innerHTML = 'Grade not available yet.';
                }
            })
            .catch(error => {
                console.error('Error fetching grade:', error);
                gradeView.innerHTML = 'An error occurred while fetching your grade.';
            });
    }
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