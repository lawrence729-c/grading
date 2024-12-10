function composeMessage(){ 
    /*Employ nodemailer's inherent functions to compose message functionality*/
    const to = document.getElementById('message-to').value;
    const subject = document.getElementById('subject').value;
    const text = document.getElementById('type-message').value;

fetch('http://localhost:5000/send-email', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ to, subject, text })
})
.then(response => response.json())
.then(data => {
    if (data.msg === 'Email sent successfully') {
        alert('Email sent successfully!');
    } else {
        alert('Failed to send email.');
    }
})
.catch(error => {
    console.error('Error during email send:', error);
    alert('An error occurred while sending the email.');
});
}

function fetchMessages(type) {
    fetch(`http://localhost:5000/${type}`)  // Adjust with actual endpoint for inbox/starred/etc.
        .then(response => response.json())
        .then(data => {
            const messageContainer = document.getElementById(`${type}-messages`);
            messageContainer.innerHTML = '';  // Clear previous messages

            data.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message-item');
                messageElement.innerHTML = `
                    <span class="message-subject">${message.subject}</span>
                    <span class="message-date">${message.date}</span>
                `;
                messageContainer.appendChild(messageElement);
            });
        })
        .catch(error => console.error('Error fetching messages:', error));
}

// Example usage: fetch inbox messages when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchMessages('inbox');
});

function fetchMessageReports(type) {
    fetch(`http://localhost:5000/${type}`) // Adjust with actual endpoint for inbox/starred/etc.
        .then(response => response.json())
        .then(data => {
            const messageContainer = document.getElementById(`${type}-messages`);
            messageContainer.innerHTML = ''; // Clear previous messages

            data.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message-item');

                // Check if message subject matches "Performance Reports"
                if (message.subject === "Performance Reports") {
                    messageElement.innerHTML = `
                        <span class="message-subject">${message.subject}</span>
                        <span class="message-date">${message.date}</span>
                        <div class="performance-report">
                            <span>${message.text}</span>
                        </div>
                    `;
                } else {
                    messageElement.innerHTML = `
                        <span class="message-subject">${message.subject}</span>
                        <span class="message-date">${message.date}</span>
                    `;
                }

                messageContainer.appendChild(messageElement);
            });
        })
        .catch(error => console.error('Error fetching messages:', error));
}

function composeMessageReports(){
    const to = document.getElementById('message-to').value;
    const subject = document.getElementById('subject').value;
    const text = document.getElementById('type-message').value;
    
    const reports = "Performance Reports";

    if(subject === reports){ 
        fetch('http://localhost:5000/send-performance-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ to, subject, text })
        })
        .then(response => response.json())
        .then(data => {
            if (data.msg === 'Email sent successfully') {
                alert('Email sent successfully!');
            } else {
                alert('Failed to send email.');
            }
        })
        .catch(error => {
            console.error('Error during email send:', error);
            alert('An error occurred while sending the email.');
        });
    } else {
        alert("Only 'Performance Reports' as the subject can be used to send performance reports.");
    }
}