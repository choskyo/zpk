var Database = require("./database.js"); 
var db = new Database();

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
var Pack = require('./pack.js');

var socketList = {};

db.getStations();

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	socket.id = Math.random();
	console.log("Client " + socket.id + " connected.");
	socketList[socket.id] = socket;

	socket.on('loginRequest', function(user) {
		db.isPasswordValid(user, function(r) {
			if(r) {
				Player.onConnect(socket);
				socket.emit('loginResponse', {success: true});
			}
			else {
				socket.emit('loginResponse', {success: false});
			}

		});

	});

	socket.on('regRequest', function(user) {
		db.isUserTaken(user, function(r) {
			if(r) {
				socket.emit('regResponse', {success: false});
			}
			else {
				db.newUser(user, function(){
					socket.emit('regResponse', {success: true});
				});
			}
		})
	});



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

	var updatePack = {
		players: Player.update(),
		projectiles: Projectile.update(),
		stations: Station.update()
	};

	for(var s in socketList){
		var sock = socketList[s];
		sock.emit('initPack', Pack.initPack);
		sock.emit('updatePack', updatePack);
		sock.emit('delPack', Pack.delPack);
	}

	Pack.initPack.players = [];
	Pack.initPack.projectiles = [];
	Pack.initPack.stations = [];

	Pack.delPack.players = [];
	Pack.delPack.projectiles = [];
	Pack.delPack.stations = [];

},1000/25);