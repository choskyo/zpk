//var mongojs = require("mongojs");
//var db = mongojs('localhost:27017/myGame', ['account']);

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/pub/index.html');
});
app.use('/pub',express.static(__dirname + '/pub'));

serv.listen(process.env.PORT || 80);
console.log("Server started.");

var io = require('socket.io')(serv,{});

io.sockets.on('connection', function(socket) {
	console.log("kawaii connection you got there sempai");

	socket.emit('sugoi');
});
