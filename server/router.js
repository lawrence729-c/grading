const path = require("path");

//Page listeners
var router = function(app) {  

    app.get("/", function(req, res) { 
		res.status(200).sendFile(path.join(__dirname + "/../client/index.html"));
	});

	app.get("/home", function(req, res) { 
		res.status(200).sendFile(path.join(__dirname + "/../client/index.html"));
	});

	app.get("/menu", function(req, res) { 
		res.status(200).sendFile(path.join(__dirname + "/../client/menu.html"));
	});

	app.get("/login", function(req, res) { 
		res.status(200).sendFile(path.join(__dirname + "/../client/login.html"));
	});

	app.get("/logout", function(req, res) { 
		res.status(200).sendFile(path.join(__dirname + "/../client/logout.html"));
	});

	app.get("/modules", function(req, res) { 	
		const loggedInUser = req.cookies.loggedInUser;
		if(!loggedInUser){ 
			return res.status(402).json({msg: 'Access Denied'});
		}
		/*if(!loggedInUser || loggedInUser !== 'admin'){ 
			return res.status(402).json({msg: 'Access Denied'});
		}*/
		res.status(200).sendFile(path.join(__dirname + "/../client/modules.html"));
	});
	 
	app.get("/mail", function(req, res) { 
		const loggedInUser = req.cookies.loggedInUser;
		if(!loggedInUser){ 
			return res.status(402).json({msg: 'Access Denied'});
		}
		/*if(!loggedInUser || loggedInUser !== 'admin'){ 
			return res.status(402).json({msg: 'Access Denied'});
		}*/
		res.status(200).sendFile(path.join(__dirname + "/../client/mail.html"));
	}); 

	app.get("/grades", function(req, res) { 
		const loggedInUser = req.cookies.loggedInUser;
		if(!loggedInUser){ 
			return res.status(402).json({msg: 'Access Denied'});
		}
		/*if(!loggedInUser || loggedInUser !== 'admin'){ 
			return res.status(402).json({msg: 'Access Denied'});
		}*/
		res.status(200).sendFile(path.join(__dirname + "/../client/grades.html"));
	});

	app.get("/calculator", function(req, res) { 
		/*const loggedInUser = req.cookies.loggedInUser;
		if(!loggedInUser){ 
			return res.status(402).json({msg: 'Access Denied'});
		}
		if(!loggedInUser || loggedInUser !== 'admin'){ 
			return res.status(402).json({msg: 'Access Denied'});
		}*/
		res.status(200).sendFile(path.join(__dirname + "/../client/calculator.html"));
	});

}; 

 module.exports =  router;