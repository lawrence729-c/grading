document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-message');
    if (sendButton) {
        sendButton.addEventListener('click', composeMessage);
    }
});

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