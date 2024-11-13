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

	app.get("/calculator", function(req, res) { 
		res.status(200).sendFile(path.join(__dirname + "/../client/calculator.html"));
	});

		

	
/*	app.get("/", function(req, res) { 
		res.status(200).sendFile(path.join(__dirname + "/../client/ .html"));
	});

	app.get("/ ", function(req, res) { 
		res.status(200).sendFile(path.join(__dirname + "/../client/ .html")); 
	}); */
}; 

 module.exports =  router;
    
