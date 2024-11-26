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

		const checkUserQuery = 'SELECT * FROM student WHERE student_username = ?';
    	connection.query(checkUserQuery, [username], function(err, results) {
      	if (err) {
        	console.error('Error checking for existing username:', err);
        	return res.status(500).send(json.stringify({ msg: "Error checking for existing username" }));
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
		const { username, password } = req.body;
		if (!username || !password) {
            return res.status(400).json({ msg: "Username and password are required" });
        }
		const query = 'SELECT * FROM students WHERE student_username = ?';

		connection.query(query, [username], function(err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send(json.stringify({ msg: "Internal Server Error" }));
            }
		
			if (results.length === 0 || results[0].student_password !== password ) {
                return res.status(401).send(json.stringify({ msg: "Invalid username or password" }));
            }

			const user = results[0];
			/*if (user.student_password !== password) {
                return res.status(401).send(json.stringify({ msg: "Invalid username or password" }));
            }*/

    		res.status(200).json({
                msg: "Login successful",
                user: {
					studentID: user.studentID,
                	student_first_name: user.student_first_name,
                	student_last_name: user.student_last_name,
                	student_emailaddress: user.student_emailaddress,
                	student_grade: user.student_grade,
                	student_course_number: user.student_course_number,
                	student_performance_report: user.student_performance_report,
					role: 'student',
				}
			}); 
    	}); 
	});

	app.get('/get-student-ids', function(req, res) {
		const query = 'SELECT studentID FROM students';
				
		connection.query(checkUserQuery, [username], function(err, results) {
			if (err) {
				console.error(err);
				return res.status(500).send(json.stringify({ msg: "Internal Server Error" }));
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
            return res.status(500).send(json.stringify({ msg: "Internal Server Error" }));
        }
		const assignmentIDs = results.map(row => row.assignmentsID);
        res.json(assignmentIDs);  // Send back assignments list to the client
    });
});

};

module.exports = services;

/*connection.query("INSERT INTO student SET ?", data, function(err) { 
	if(err) { 
		return res.status(401).send(JSON.stringify({msg:"Error" + err}));
	} else {
		 return res.status(400).send(JSON.stringify({msg:"SUCCESS"}));
	 }
});*/

