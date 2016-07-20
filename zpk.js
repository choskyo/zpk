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

var socketList = {};

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	socket.id = Math.random();
	console.log("Client " + socket.id + " connected.");
	socket.x = 0;
	socket.y = 0;
	socket.r = Math.floor(Math.random()*(255)+1);
	socket.g = Math.floor(Math.random()*(255)+1);
	socket.b = Math.floor(Math.random()*(255)+1);

	socketList[socket.id] = socket;

	socket.on('disconnect',function(){
		delete socketList[socket.id];
	});

});

setInterval(function(){
	var pack = [];
	for(var s in socketList){
		var socket = socketList[s];
		socket.x++;
		socket.y++;
		pack.push({
			x:socket.x,
			y:socket.y,
			r:socket.r,
			g:socket.g,
			b:socket.b
		});
	}
	for(var s2 in socketList){
		var socket2 = socketList[s2];
		socket2.emit('nP',pack);
	}




},1000/25);