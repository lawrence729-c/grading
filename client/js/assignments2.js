document.addEventListener('DOMContentLoaded', () => {
    const studentIdList = document.getElementById('student-dropdown');
    const enterIdInput = document.getElementById('enter-id');
    fetchStudentIDsForAssignments();
// Fetch and display student IDs
function fetchStudentIDsForAssignments() {
    fetch('http://localhost:5000/fetchStudentIDs')
        .then(response => response.json())
        .then(data => {
            studentIdList.innerHTML = ''; // Clear previous list
            data.forEach(studentId => {
                const li = document.createElement('li');
                li.textContent = studentId;
                li.addEventListener('click', () => {
                    enterIdInput.value = studentId;
                    studentIdList.style.display = 'none';
                    fetchAssignments(studentId); // Fetch assignments for the student
                });
                studentIdList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching student IDs:', error));
}

function verifySubmission(checkbox, assignmentURL) {
    if (checkbox.checked) {
        console.log(`Assignment submitted: ${assignmentURL}`);
        // You can also trigger any API calls for verification or submission here.
    } else {
        console.log('Assignment not submitted');
    }
}


});

function updateDueDate() {
    const assignmentID = document.getElementById('assignment').value;
    const newDueDate = document.getElementById('change').value;

    if (!assignmentID || !newDueDate) {
        alert("Please enter both the assignment ID and the new due date.");
        return;
    }

    changeDueDate(assignmentID, newDueDate);
}

function changeDueDate(assignmentID, newDueDate) {

    fetch('/update-due-date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            assignmentID: assignmentID,
            newDueDate: newDueDate
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.msg);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function updateStatus(){ 
    const assignmentID = document.getElementById('enter-assignment-id').value;
    const studentID = document.getElementById('enter-student-id').value;
    const status = document.getElementById('assignment-status').value;

    if(!assignmentID || !studentID || !status){ 
		alert( "All fields are required in order to update");
        return;
	}

    const data = {
        assignmentID: assignmentID,
        studentID: studentID,
        assignmentStatus: status
    };

    fetch('/update-status', { 
        method: 'POST',
        headers: { 
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data) 
    })
    .then(response => response.json())
    .then(data => {
        if(data.msg){
        console.log(data.msg);
    }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating assignment status.');
    });

}

// Function to toggle visibility of file input
function toggleFileInput() {
    const fileInput = document.getElementById('fileInput');
    // Toggle visibility of file input field
    if (fileInput.style.display === 'none' || fileInput.style.display === '') {
        fileInput.style.display = 'block';
    } else {
        fileInput.style.display = 'none';
    }
}

// Handle the file upload event
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        console.log('File selected: ' + file.name);
        // You can add additional code here to upload the file to the server or handle the file as needed
    }
}


function displayDueAssignments(assignments) {
    const dueList = document.querySelector('.due-list');
    assignments.forEach(assignment => {
        const li = document.createElement('li');
        li.textContent = assignment; // Assuming assignment is a string or object
        dueList.appendChild(li);
    });
}