"use strict";
var utils = require("./utils");
var db = require("./db");
var express = require('express');
var app = express();
var server = require('http').Server(app);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/pub/index.html');
});
app.use('/pub', express.static(__dirname + '/pub'));
server.listen(process.env.PORT || 3001);
console.log('Listening..');
var sockets = {};
var io = require('socket.io')(server, {});
io.sockets.on('connection', function (socket) {
    socket.id = Math.random();
    sockets[socket.id] = socket;
    console.log("[" + utils.getTime() + "] Client " + socket.id + " connected.");
    socket.on('regRequest', function (packet) {
        db.createPlayer(packet, function (player) {
            if (player) {
                socket.emit('regResponse', {
                    success: true
                });
            }
            else {
                socket.emit('regResponse', {
                    success: false
                });
            }
        });
    });
    socket.on('loginRequest', function (packet) {
        db.playerExists(packet, function (res) {
            if (res) {
                db.getPlayer(packet, function (player) {
                    //TODO: Load player data
                    socket.emit('loginResponse', {
                        success: true
                    });
                });
            }
            else {
                socket.emit('loginResponse', {
                    success: false
                });
            }
        });
    });
});
