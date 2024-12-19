const express = require('express');
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use((req, res, next) => { 
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

//prep the server
var server;
var port = 5000;

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // For example, Gmail
    auth: {
        user: 'your-email@gmail.com', 
        pass: 'your-email-password'  
    }
});

//Page listeners
var router = require("./router.js");
router(app);

//Service listeners 
var services = require("./services.js"); 
services(app);

/*Email verification
function sendVerificationEmail(userEmail, verificationToken) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const verificationLink = `http://localhost:5000/verify-email?token=${verificationToken}`;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: userEmail,
        subject: 'Email Verification',
        text: `Please verify your email by clicking the following link: ${verificationLink}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}*/

//listen
server = app.listen(port, function(err) { 
	if(err) throw err;
	console.log("listening on port: " + port);
});