let express = require('express');
let app = express();
let serv = require('http').Server(app);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/pub/index.html');
});
app.use('/pub',express.static(__dirname + '/pub'));
serv.listen(process.env.PORT || 3001);

console.log('Listening..');

let io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket) {
    socket.id = Math.random();
    let d = new Date();
    console.log("[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "] Client " + socket.id + " connected.");
});