//var mongojs = require("mongojs");
//var db = mongojs('localhost:27017/myGame', ['account']);

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/pub/index.html');
});
app.use('/pub',express.static(__dirname + '/pub'));

serv.listen(process.env.PORT || 3000);
console.log("Server started.");

var Entity = require('./entity.js');
var Player = require('./player.js');
var Station = require('./station.js');
var Projectile = require('./projectile.js');

var socketList = {};

var stat1 = new Station("desu", 400, 500);

var stat2 = new Station("kawaii", 50, 50);


var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	socket.id = Math.random();
	console.log("Client " + socket.id + " connected.");

	socketList[socket.id] = socket;

	Player.onConnect(socket);

	socket.on('disconnect',function(){
		Player.onDisconnect(socket);
		delete socketList[socket.id];
	});

	socket.on('clientMessage', function(message) {
		var username = ("" + socket.id).slice(2, 7);
		for(var u in socketList) {
			socketList[u].emit('serverMessage', '[' + username + ']' + message);
		}
	})

});

setInterval(function(){

	var pack = {
		player: Player.update(),
		projectile: Projectile.update(),
		station: Station.update()
	};

	for(var s2 in socketList){
		var socket2 = socketList[s2];
		socket2.emit('updatePack',pack);
	}

},1000/33);