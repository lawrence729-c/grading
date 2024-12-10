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
                        fetchAssignment(studentId); // Fetch assignment when a student is selected
                    });
                    studentIdList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching student IDs:', error));
    }

function dragAsssignments(ev) { 
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
ev.preventDefault();
}

function dropAssignments(ev){ 
const preciseFileTypes = ['.doc','.pdf','.pptx'];

ev.preventDefault();
const data = ev.dataTransfer.getData("text");
const draggedAssignment = document.getElementById(data);
ev.target.appendChild(draggedAssignment);

draggedAssignment.style.backgroundColor = "#ccc";
draggedAssignment.setAttribute("draggable", "false");

const fileName = draggedAssignment.textContent.trim();
const fileExtension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();

try {
    if(!preciseFileTypes.includes(fileExtension)){ 
        throw new Error('Invalid file type')
    }
    console.log("File submitted");
    submitAssignment(draggedAssignment); // Call function to submit the assignment file

} catch (error) {
    alert(error.message)
    console.log(error.message)
}

/*if (draggedAssignment) {
    draggedAssignment.addEventListener('click', () => {
        // After submission, fetch due assignments again to update the list
        fetchDueAssignments();
    });
}*/

}

function submitAssignment(draggedAssignment) {
    const studentID = window.localStorage.getItem('studentID'); // Assuming the studentID is stored in localStorage
    const assignmentID = draggedAssignment.getAttribute('data-assignment-id'); // Assuming assignments have an ID

    const formData = new FormData();
    formData.append('assignmentFile', draggedAssignment.files[0]); // Assuming you can access the file directly
    formData.append('studentID', studentID);
    formData.append('assignmentID', assignmentID);

    fetch('/submit-assignment', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg === "Assignment submitted successfully") {
            alert('Assignment submitted successfully!');
        } else {
            alert('Failed to submit assignment');
        }
    })
    .catch(error => {
        console.error('Error submitting assignment:', error);
    });
}

async function fetchAssignmentIDs() {
    try {
        const response = await fetch('/get-assignment-ids'); // Assuming an endpoint to fetch assignment IDs
        const assignmentIDs = await response.json();

        // Now you can use the assignment IDs to display them or handle further operations
        console.log(assignmentIDs);  // For debugging

        return assignmentIDs;
    } catch (err) {
        console.error("Error fetching assignment IDs:", err);
        return [];
    }
}

async function showAssignmentIDs() {
    const assignmentIDs = await fetchAssignmentIDs();
    
    // You can use the fetched assignment IDs to dynamically update the UI or perform other tasks
    if (assignmentIDs.length > 0) {
        console.log("Assignment IDs fetched:", assignmentIDs);
    } else {
        console.log("No assignment IDs available.");
    }
}

// Call the function (for example, when the page loads or on a button click)
showAssignmentIDs();

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const role = JSON.parse(loggedInUser).role;  
        restrictAdminActions(role); 
    }   
    
    const studentIdList = document.getElementById('student-dropdown');
    const enterIdInput = document.getElementById('enter-id');
    const assignmentContainer = document.getElementById('assignment-container'); // This will display the assignment
    const gradeInput = document.getElementById('grade-input'); // The input field for grades
    const gradeSubmitButton = document.getElementById('grade-submit'); // Submit button for the grade

    // Display the assignment file when the admin selects a student
    async function fetchAssignment(studentId) {
        fetch(`http://localhost:5000/getAssignment/${studentId}`) // Fetch the assignment based on student ID
            .then(response => response.json())
            .then(data => {
                if (data.assignmentFileUrl) {
                    // Assuming the backend provides a file URL to the assignment
                    const assignmentFileUrl = data.assignmentFileUrl;
                    displayAssignmentFile(assignmentFileUrl);
                } else {
                    assignmentContainer.innerHTML = 'No assignment found for this student.';
                }
            })
            .catch(error => console.error('Error fetching assignment:', error));
    }

    // Display the assignment file in the container
    function displayAssignmentFile(fileUrl) {
        assignmentContainer.innerHTML = `
            <iframe src="${fileUrl}" width="100%" height="600px"></iframe>
            <p>Assignment file loaded. Please review it.</p>
        `;
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

function displayDueAssignments(assignments) {
    const dueList = document.querySelector('.due-list');
    assignments.forEach(assignment => {
        const li = document.createElement('li');
        li.textContent = assignment; // Assuming assignment is a string or object
        dueList.appendChild(li);
    });
}