var mongojs = require("mongojs");
var db = mongojs('localhost:27017/myGame', ['account','progress']);
var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server started.");

var SOCKET_LIST = {};

//Include server
var Entity = require('./server/entity.js');
var Player = require('./server/player.js');

var DEBUG = true;

var isValidPassword = function(data,cb){
	db.account.find({username:data.username,password:data.password},function(err,res){
		if(res.length > 0)
			cb(true);
		else
			cb(false);
	});
};
var isUsernameTaken = function(data,cb){
	db.account.find({username:data.username},function(err,res){
		if(res.length > 0)
			cb(true);
		else
			cb(false);
	});
};
var addUser = function(data,cb){
	db.account.insert({username:data.username,password:data.password},function(err){
		cb();
	});
};

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	console.log("Connection accepted.");
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;
	
	socket.on('signIn',function(data){
		isValidPassword(data,function(res){
			if(res){
				console.log('Login successful.');
				Player.onConnect(socket);
				socket.emit('signInResponse',{success:true});
			} else {
				console.log('Login failed.');
				socket.emit('signInResponse',{success:false});			
			}
		});
	});
	socket.on('signUp',function(data){
		isUsernameTaken(data,function(res){
			if(res){
				console.log('Signup successful.');
				socket.emit('signUpResponse',{success:false});		
			} else {
				addUser(data,function(){
					console.log('Signup failed.');
					socket.emit('signUpResponse',{success:true});					
				});
			}
		});		
	});

	socket.on('disconnect',function(){
		delete SOCKET_LIST[socket.id];
		Player.onDisconnect(socket);
		console.log('Player disconnected.');
	});
	socket.on('sendMsgToServer',function(data){
		var playerName = ("" + socket.id).slice(2,7);
		for(var i in SOCKET_LIST){
			SOCKET_LIST[i].emit('addToChat',playerName + ': ' + data);
		}
	});

});

var initPack = {player:[],bullet:[]};
var removePack = {player:[],bullet:[]};

/**
 * Infinite Loop
 */
setInterval(function(){
	var pack = {
		player:Player.update(),
	};
	
	for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit('init',initPack);
		socket.emit('update',pack);
		socket.emit('remove',removePack);
	}
	initPack.player = [];
	removePack.player = [];
	
},1000/25);