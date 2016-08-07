//Use db object as if it was a MVC repo
var Database = require("./data/database.js");
var db = new Database();

//Fetch serverside game classes
var Entity = require('./entities/entity.js');
var Player = require('./entities/player.js');
var Station = require('./entities/station.js');
var Projectile = require('./entities/projectile.js');
var Wormhole = require('./entities/wormhole.js');
//All packs should be defined in below file
var Pack = require('./data/pack.js');

//Standard nodejs setup
var express = require('express');
var app = express();
var serv = require('http').Server(app);
app.get('/',function(req, res) {
	res.sendFile(__dirname + '/pub/index.html');
});
app.use('/pub',express.static(__dirname + '/pub'));
serv.listen(process.env.PORT || 3001);

console.log("Server started.");

var socketList = {};

//Fetch permanent entities from db
db.getStations();
new Wormhole('WormholeA', 300, 200, 'testy', 'qwe');
new Wormhole('WormholeB', 350, 250, 'qwe', 'testy');
new Wormhole('WormholeC', -100, -200, 'testy', 'qwe');

//db.getDrones
//db.getOtherStuff etc

//Anything to do with receiving + sending packs to clients
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
				var username = ("" + socket.id).slice(2, 7);
				for(var u in socketList) {
					socketList[u].emit('serverMessage', '[' + username + '] has connected.');
				}
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
		var username = ("" + socket.id).slice(2, 7);
		for(var u in socketList) {
			socketList[u].emit('serverMessage', '[' + username + '] has left the game.');
		}
		delete socketList[socket.id];
	});

	socket.on('respawnRequest', function(userId) {
		Player.list[userId].respawn();
	});

	//Relay chat back to clients
	socket.on('clientMessage', function(message) {
		var username = ("" + socket.id).slice(2, 7);
		for(var u in socketList) {
			socketList[u].emit('serverMessage', '[' + username + ']' + message);
		}
	})
});

//25?FPS loop
setInterval(function(){

	var updatePack = {
		players: Player.update(),
		projectiles: Projectile.update(),
		stations: Station.update(),
		wormholes: Wormhole.update()
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
	Pack.initPack.wormholes = [];

	Pack.delPack.players = [];
	Pack.delPack.projectiles = [];
	Pack.delPack.stations = [];
	Pack.delPack.wormholes = [];

},40);