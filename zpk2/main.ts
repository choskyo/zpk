import utils = require('./utils');
import db = require('./db');
let express = require('express');
let app = express();
let server = require('http').Server(app);

app.get('/', function (req:any, res:any) {
    res.sendFile(__dirname + '/pub/index.html');
});
app.use('/pub',express.static(__dirname + '/pub'));
server.listen(process.env.PORT || 3001);
console.log('Listening..');

let sockets: any = {};

import Player = require('./entities/player');
import System = require('./entities/system');

let io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket:any) {
    socket.id = Math.random();
    sockets[socket.id] = socket;
    console.log("[" + utils.getTime() + "] Client " + socket.id + " connected.");

    socket.on('regRequest', function(packet:any) {
        db.createPlayer(packet, function(player:any) {
            if(player) {
                socket.emit('regResponse', {
                    success: true
                });
            } else {
                socket.emit('regResponse', {
                    success: false
                });
            }
        })
    });
    socket.on('loginRequest', function(packet:any) {
        db.playerExists(packet, function(res:boolean) {
            if(res) {
                db.getPlayer(packet, function(player:any) {
                    Player.onConnect(socket, player);
                    socket.emit('loginResponse', {
                        success: true
                    });
                })
            } else {
                socket.emit('loginResponse', {
                    success: false
                });
            }
        });
    });
    socket.on('disconnect', function() {
        console.log("[" + utils.getTime() + "] Client " + socket.id + " disconnected.");
        delete sockets[socket.id];
    });
    socket.on('clientMessage', function(packet: any) {
        io.emit('serverMessage', packet);
    })
});

setInterval(function() {
    
    let update = {
        players: Player.update()
    };
    
    for(let i = 0; i < sockets.length; i++) {
        let socket = sockets[i];
        //TODO: send packets
        socket.emit('updatePack', update);
    }
    
}, 1000/30);