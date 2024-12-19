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

    /* 
    if (Object.values(grades).includes("")) {
        alert("Please enter grades for all assignments.");
        return;
    }*/

    const avgGrade = document.getElementById('avg-grade').value;
    if (!avgGrade) {
        alert("Please enter the average grade.");
        return;
    }

    let allGrades = JSON.parse(localStorage.getItem('studentGrades')) || {};

    if (allGrades[studentName]) {
        allGrades[studentName].grades = grades;
        allGrades[studentName].avgGrade = avgGrade;
    } else {
        allGrades[studentName] = { grades, avgGrade };
    }

    localStorage.setItem('studentGrades', JSON.stringify(allGrades));

    // Redirect to view grades page or show confirmation
    window.location.href = '/view-grades.html';
    window.location.href = '/counselorview-grades.html';
}