//sudo npm install --save body-parser

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require("body-parser"); //body-parser extract the entire body portion of an incoming request stream and exposes it on req.body as something easier to interface with 
var sql = require('mssql'); //connecting to my mssql db
var child_process = require("child_process"); //.spawn; // creates a new python process 
//var process = spawn('python', ["connection.py"]);// connecting to my python doc that connects to my db

//////////////////////using child processes to connect python to node.js////////////////////////////
child_process.exec('python connection.py', function (err){
    if (err) {
    console.log("child processes failed with error code: " + err.code);
  }
});

//////////////////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: false }));

/////////////////////////the three main pages on the site ////////////////////////////////

app.use(express.static(__dirname + '/public')); //this makes it easy to access the individual pages, with their base name instead of thier file names 
app.get('/', function(req, res) {
	 res.sendFile(__dirname + '/public/index.html');
});
app.get('/Manu', function(req, res) {
	 res.sendFile(__dirname + '/public/Manu.html');
});
app.get('/Mancity', function(req, res) {
	 res.sendFile(__dirname + '/public/Mancity.html');
});
app.get('/About', function(req, res) {
     res.sendFile(__dirname + '/public/About.html');
});

/////////////////////////////////////////////////////////
server.listen(3000, function() {
	console.log('listening on *:3000');
});