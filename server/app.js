const express = require('express');
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');

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
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-email-password'    // Replace with your email password
    }
});

//Page listeners
var router = require("./router.js");
router(app);

//Service listeners 
var services = require("./services.js"); 
services(app);


// Send email endpoint
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;
    
    // Email options
    const mailOptions = {
        from: 'your-email@gmail.com', // Sender address
        to,                          // List of recipients
        subject,                     // Subject line
        text                         // Plain text body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ msg: 'Failed to send email' });
        }
        console.log('Email sent: ' + info.response);
        res.status(200).json({ msg: 'Email sent successfully' });
    });
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Specify the upload folder
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
    }
});

// Initialize multer with file storage settings
const upload = multer({ storage: storage });


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