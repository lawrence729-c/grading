const mysql = require('mysql2');

const connection = mysql.createConnection({ 
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'grading'
});

connection.connect(function(err){ 
	if(err) throw err;
	console.log("Connected to MySQL");
});  

var services = function(app) { 
	app.post('/register', function(req, res) {
        //const { username, password, firstName, lastName, email } = req.body;
		const userData = { 
				username: req.body.username,
				 password: req.body.password,
				  firstName: req.body.firstName,
				   lastName: req.body.lastName,
				    email: req.body.email,
				};

        if (!username || !password || !firstName || !lastName || !email) {
            return res.status(400).json({ msg: "All fields are required" });
        }

		const checkUserQuery = 'SELECT * FROM students WHERE student_username = ?';
    	connection.query(checkUserQuery, [username], function(err, results) {
      	if (err) {
        	console.error('Error checking for existing username:', err);
        	return res.status(500).send(JSON.stringify({ msg: "Error checking for existing username" }));
      	}
      	if (results.length > 0) {
        	return res.status(400).send(json.stringify({ msg: "Username already exists" }));
      	}

		const insertUserQuery = 'INSERT INTO students (student_username, student_password, student_first_name, student_last_name, student_emailaddress) VALUES (?, ?, ?, ?, ?)';	
		connection.query(insertUserQuery, userData, function(err) {
			if (err) {
				console.error(err);
				return res.status(500).send(json.stringify({ msg: "Error inserting user into database" }));
			}

			res.status(200).send(json.stringify({ msg: "Registration successful" }));
		
        });

		}); 
		
		});

		app.post('/login', function(req, res) {
			console.log("Logging in");
			const { username, password } = req.body;
			if (!username || !password) {
				return res.status(400).json({ msg: "Username and password are required" });
			}
	
			// Check admin login
			const adminQuery = 'SELECT * FROM admin WHERE admin_username = ?';
			connection.query(adminQuery, [username], function(err, results) {
				if (err) {
					console.error(err);
					return res.status(500).send({ msg: "Internal Server Error" });
				}
	
				if (results.length > 0 && results[0].admin_password === password) {
					const user = results[0];
					return res.status(200).json({
						msg: "Login successful",
						user: {
							id: user.adminID,
							firstName: user.admin_first_name,
							lastName: user.admin_last_name,
							email: user.admin_emailaddress,
							role: 'admin'
						}
					});
				}
	
				// Check student login if admin login fails
				const studentQuery = 'SELECT * FROM students WHERE student_username = ?';
				connection.query(studentQuery, [username], function(err, results) {
					console.log('Logging in');
					if (err) {
						console.error(err);
						return res.status(500).send({ msg: "Internal Server Error" });
					}
	
					if (results.length > 0 && results[0].student_password === password) {
						const user = results[0];
						return res.status(200).json({
							msg: "Login successful",
							user: {
								id: user.studentID,
								firstName: user.student_first_name,
								lastName: user.student_last_name,
								email: user.student_emailaddress,
								role: 'student'
							}
						});
					}
	
					// Check counselor login if student login fails
					const counselorQuery = 'SELECT * FROM counselor WHERE counselor_username = ?';
					connection.query(counselorQuery, [username], function(err, results) {
						console.log('Logging in');
						if (err) {
							console.error(err);
							return res.status(500).send({ msg: "Internal Server Error" });
						}
	
						if (results.length > 0 && results[0].counselor_password === password) {
							const user = results[0];
							return res.status(200).json({
								msg: "Login successful",
								user: {
									id: user.counselorID,
									firstName: user.counselor_first_name,
									lastName: user.counselor_last_name,
									email: user.counselor_emailaddress,
									role: 'counselor'
								}
							});
						}
	
						// If none match, return invalid credentials
						return res.status(401).send({ msg: "Invalid username or password" });
					});
				});
			});
		});

	app.get('/fetchStudentIDs', function(req, res) {
		const query = 'SELECT studentID FROM student';
				
		connection.query(query, function(err, results) {
			if (err) {
				console.error(err);
				return res.status(500).send(JSON.stringify({ msg: "Internal Server Error" }));
			}
	
			const studentIDs = results.map(row => row.studentID);
			res.json(studentIDs);
			});
			}); 

app.get('/get-assignment-ids', function(req, res) {
    const query = 'SELECT assignmentsID FROM assignments';  // Adjust the query to your table structure
    connection.query(query, function(err, results) {
        if (err) {
            console.error(err);
            return res.status(500).send(JSON.stringify({ msg: "Internal Server Error" }));
        }
		const assignmentIDs = results.map(row => row.assignmentsID);
        res.json(assignmentIDs);  // Send back assignments list to the client
    });
});

app.get('/assignments-for-student/:studentID', function (req, res) {
	const { studentID } = req.params;
	const query = `
		SELECT a.assignmentsID, a.assignments_name, a.assignments_status, a.assignments_file_type, 
			   a.assignments_due_date, a.assignments_weight_score, hs.student_grade
		FROM assignments a
		LEFT JOIN assignments_has_student hs ON a.assignmentsID = hs.assignments_assignmentsID
		WHERE hs.student_studentID = ?
	`;
	connection.query(query, [studentID], function (err, results) {
		if (err) {
			console.error(err);
			return res.status(500).send(JSON.stringify({ msg: "Error retrieving assignments for student" }));
		}
		res.status(200).json(results);
	});
});

// Submit grade for student on assignment
app.post('/submit-grade', function (req, res) {
	const { assignmentID, studentID, grade } = req.body;

	if (!assignmentID || !studentID || !grade) {
		return res.status(400).json({ msg: "All fields are required" });
	}

	const query = `
		INSERT INTO assignments_has_student (assignments_assignmentsID, student_studentID, student_grade)
		VALUES (?, ?, ?)
		ON DUPLICATE KEY UPDATE student_grade = ?
	`;
	connection.query(query, [assignmentID, studentID, grade, grade], function (err, results) {
		if (err) {
			console.error(err);
			return res.status(500).json({ msg: "Error submitting grade" });
		}
		res.status(200).json({ msg: "Grade submitted successfully" });
	});
});

// Update assignment due date
app.post('/update-due-date', function (req, res) {
	const { assignmentID, newDueDate } = req.body;

	if (!assignmentID || !newDueDate) {
		return res.status(400).json({ msg: "Assignment ID and new due date are required" });
	}

	const query = 'UPDATE assignments SET assignments_due_date = ? WHERE assignmentsID = ?';
	connection.query(query, [newDueDate, assignmentID], function (err, results) {
		if (err) {
			console.error(err);
			return res.status(500).json({ msg: "Error updating due date" });
		}
		res.status(200).json({ msg: "Due date updated successfully" });
	});
});

app.post('/update-status', function (req, res) { 
	const{assignmentID, studentID, assignmentStatus} = req.body;

	if(!assignmentID || !studentID || !assignmentStatus){ 
		return res.status(400).JSON({ msg: "All fields are required in order to update"});
	}

	const query = 'UPDATE assignments_has_student SET assignments_status = ? WHERE assignments_assignmentsID = ? AND student_studentID = ?';
	connection.query(query, [assignmentID, studentID, assignmentStatus], function (err, results) {
		if(err){ 
			console.error(err);
			return res.status(500).JSON({msg: "Error updating status"});
		}

		if (results.affectedRows === 0) {
            return res.status(404).json({ msg: "No record found for the given assignment and student." });
        }

		res.status(200).JSON({msg: "Assignment status updated successfully"});
	});
});

app.post('/send-performance-report', function (req, res) {
    const { to, subject, text } = req.body;
    
    // Ensure that only admins can send performance reports
    if (req.session.userRole !== 'admin') {
        return res.status(403).json({ msg: "You are not authorized to send performance reports." });
    }

    // Send email logic using nodemailer
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'admin_email@gmail.com',
            pass: 'admin_email_password'
        }
    });

    const mailOptions = {
        from: 'admin_email@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
            return res.status(500).json({ msg: "Failed to send performance report" });
        }
        res.status(200).json({ msg: "Email sent successfully" });
    });
});

/*app.get('/verify-email', function(req, res) {
    const { token } = req.query;
    // Verify the token and update the user's `email_verified` field in the database

    const query = 'UPDATE students SET email_verified = TRUE WHERE verification_token = ?';
    connection.query(query, [token], function(err, results) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error verifying email');
        }

        res.send('Email successfully verified!');
    });
});*/

app.get('/inbox', function (req, res) {
    const query = 'SELECT * FROM emails WHERE recipient = ? ORDER BY date DESC';
    connection.query(query, [req.session.userEmail], function (err, results) {
        if (err) {
            console.error('Error fetching inbox:', err);
            return res.status(500).json({ msg: "Error fetching inbox" });
        }
        
        res.json(results);
    });
});

}


module.exports = services;

/*connection.query("INSERT INTO student SET ?", data, function(err) { 
	if(err) { 
		return res.status(401).send(JSON.stringify({msg:"Error" + err}));
	} else {
		 return res.status(400).send(JSON.stringify({msg:"SUCCESS"}));
	 }
});*/
