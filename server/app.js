const express = require('express');
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
/*app.use((req, res, next) => { 
	res.header('Access-Control-Allow-Origin', '*');
	next();
});*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

//prep the server
var server;
var port = 5000;

//Page listeners
var router = require("./router.js");
router(app);

//Service listeners 
var services = require("./services.js"); 
services(app);

//listen
server = app.listen(port, function(err) { 
	if(err) throw err;
	console.log("listening on port: " + port);
});