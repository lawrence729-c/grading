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
        const { username, password, firstName, lastName, email } = req.body;

        if (!username || !password || !firstName || !lastName || !email) {
            return res.status(400).json({ msg: "All fields are required" });
        }

		const checkUserQuery = 'SELECT * FROM students WHERE student_username = ?';
        connection.query(checkUserQuery, [username], function(err, results) {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: "Internal Server Error" });
            }

            if (results.length > 0) {
                return res.status(400).json({ msg: "Username already taken" });
            }

			/*bcrypt.hash(password, 10, function(err, hashedPassword) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ msg: "Error hashing password" });
                }*/

			const insertUserQuery = 'INSERT INTO students (student_username, student_password, student_first_name, student_last_name, student_emailaddress) VALUES (?, ?, ?, ?, ?)';
			const userData = [username, hashedPassword, firstName, lastName, email];
	
			connection.query(insertUserQuery, userData, function(err, results) {
				if (err) {
					console.error(err);
					return res.status(500).json({ msg: "Error inserting user into database" });
				}

				res.status(200).json({ msg: "Registration successful" });
		
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
                return res.status(500).json({ msg: "Internal Server Error" });
            }
		
			if (results.length === 0) {
                return res.status(401).json({ msg: "Invalid username or password" });
            }

			if (user.student_password !== password) {
                return res.status(401).json({ msg: "Invalid username or password" });
            }

    		res.status(200).json({
                msg: "Login successful",
                user: {
					studentID: req.body.studentID,
					student_first_name: req.body.student_first_name,
					student_last_name: req.body.student_last_name,
					student_emailaddress: req.body.student_emailaddress,
					student_grade: req.body.student_grade, 
            		student_course_number: req.body.student_course_number,
            		student_performance_report: req.body.student_performance_report
				}
			}); 
    	});
	});
}; 


/*connection.query("INSERT INTO student SET ?", data, function(err) { 
	if(err) { 
		return res.status(401).send(JSON.stringify({msg:"Error" + err}));
	} else {
		 return res.status(400).send(JSON.stringify({msg:"SUCCESS"}));
	 }
});*/

module.exports = services;