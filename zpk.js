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

var Entity = require('./entity.js');
var Player = require('./player.js');
Player.list = {};
var Station = require('./station.js');

var socketList = {};
var stationList = [];

var stat1 = new Station;
stat1.name = "desu";
stat1.x = 400;
stat1.y = 500;

var stat2 = new Station;
stat2.name = "desu";
stat2.x = 100;
stat2.y = 100;

stationList.push(stat1);
stationList.push(stat2);

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

});

setInterval(function(){

	var pack = Player.update();
	var statPack = [];

	for(var s in stationList) {
		var station = stationList[s];

		statPack.push(station);
	}

	for(var s2 in socketList){
		var socket2 = socketList[s2];
		socket2.emit('nP',pack);
		socket2.emit('stations', statPack);
	}

},1000/33);