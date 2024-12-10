const path = require("path");

//Page listeners
var router = function(app) {  

    app.get("/", function(req, res) { 
		res.status(200).sendFile(path.join(__dirname + "/../client/html/index.html"));
	});

	app.get("/home", function(req, res) { 
		res.status(200).sendFile(path.join(__dirname + "/../client/html/index.html"));
	});

	app.get("/menu", function(req, res) { 
		res.status(200).sendFile(path.join(__dirname + "/../client/html/menu.html"));
	});

		app.get("/login", function(req, res) { 
			res.status(200).sendFile(path.join(__dirname + "/../client/html/login.html"));
		});

		app.get("/logout", function(req, res) { 
			res.status(200).sendFile(path.join(__dirname + "/../client/html/logout.html"));
		});
	
		app.get("/register", function(req,res){ 
			res.status(200).sendFile(path.join(__dirname + "/../client/html/register.html"));
		});

	app.get("/modules", function(req, res) { 	
		res.status(200).sendFile(path.join(__dirname + "/../client/html/modules.html"));
	});
	 
	app.get("/mail", function(req, res) { 
		/*const loggedInUser = req.cookies.loggedInUser;
		if(!loggedInUser){ 
			return res.status(402).json({msg: 'Access Denied'});
		}
		if(!loggedInUser || loggedInUser !== 'admin'){ 
			return res.status(402).json({msg: 'Access Denied'});
		}*/
		res.status(200).sendFile(path.join(__dirname + "/../client/html/mail/mail.html"));
	}); 

		app.get("/compose", function(req, res) { 
			
			res.status(200).sendFile(path.join(__dirname + "/../client/html/mail/compose.html"));
		}); 

		app.get("/inbox", function(req, res) { 
			
			res.status(200).sendFile(path.join(__dirname + "/../client/html/mail/inbox.html"));
		}); 

		app.get("/starred", function(req, res) { 
			
			res.status(200).sendFile(path.join(__dirname + "/../client/html/mail/starred.html"));
		}); 

		app.get("/sent", function(req, res) { 
			
			res.status(200).sendFile(path.join(__dirname + "/../client/html/mail/sent.html"));
		}); 

		app.get("/drafts", function(req, res) { 
			
			res.status(200).sendFile(path.join(__dirname + "/../client/html/mail/drafts.html"));
		}); 

		app.get("/reports", function(req, res) { 
			
			res.status(200).sendFile(path.join(__dirname + "/../client/html/mail/reports.html"));
		});

	app.get("/grades", function(req, res) { 
		res.status(200).sendFile(path.join(__dirname + "/../client/html/grades.html"));
	});

	app.get("/calculator", function(req, res) { 
		res.status(200).sendFile(path.join(__dirname + "/../client/html/calculator.html"));
	});

}; 

 module.exports =  router;