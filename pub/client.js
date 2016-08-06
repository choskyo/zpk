/**
 * Created by will on 14/07/16.
 */

var socket = io('');

var canvas = document.getElementById("canvas");
var ctx = document.getElementById("canvas").getContext("2d");
ctx.font = '30px Arial';

document.onmousedown = function(event){
    socket.emit('kP',{input:'attack',state:true});
};
document.onmouseup = function(event){
    socket.emit('kP',{input:'attack',state:false});
};
document.onmousemove = function(event){
    var co = {
        x: event.clientX,
        y: event.clientY,
        centerX: window.innerWidth/2,
        centerY: window.innerHeight/2
    };

    socket.emit('kP',{input:'mousePos',co});
};
document.onkeydown = function(event){
    if(event.keyCode === 68)	//d
        socket.emit('kP',{input:'right',state:true});
    else if(event.keyCode === 83)	//s
        socket.emit('kP',{input:'down',state:true});
    else if(event.keyCode === 65) //a
        socket.emit('kP',{input:'left',state:true});
    else if(event.keyCode === 87) // w
        socket.emit('kP',{input:'up',state:true});

};
document.onkeyup = function(event){
    if(event.keyCode === 68)	//d
        socket.emit('kP',{input:'right',state:false});
    else if(event.keyCode === 83)	//s
        socket.emit('kP',{input:'down',state:false});
    else if(event.keyCode === 65) //a
        socket.emit('kP',{input:'left',state:false});
    else if(event.keyCode === 87) // w
        socket.emit('kP',{input:'up',state:false});
};

respawn.onclick = function() {
    socket.emit('respawnRequest', ownId);
};

socket.on('initPack', function(pack) {
    if(pack.ownId)
        ownId = pack.ownId;

    for(var i = 0 ; i < pack.players.length; i++){
        new Player(pack.players[i]);
    }
    for(var j = 0 ; j < pack.projectiles.length; j++){
        new Projectile(pack.projectiles[j]);
    }
    for(var k = 0; k < pack.stations.length; k++) {
        new Station(pack.stations[k]);
    }
});

socket.on('updatePack', function(pack) {
    for(var i = 0; i < pack.players.length; i++) {
        var p = pack.players[i];
        var player = Player.list[p.id];
        if(player) {
            if(p.x != undefined)
                player.x = p.x;
            if(p.y != undefined)
                player.y = p.y;
            if(p.shields != undefined)
                player.shields = p.shields;
            if(p.storage != undefined)
                player.storage = p.storage;
            if(p.angle != undefined)
                player.angle = p.angle;
        }
    }

    for(var j = 0; j < pack.projectiles.length; j++) {
        var q = pack.projectiles[j];
        var projectile = Projectile.list[q.id];
        if(projectile) {
            if(q.x != undefined)
                projectile.x = q.x;
            if(q.y != undefined)
                projectile.y = q.y;
            if(q.shields != undefined)
                projectile.shields = q.shields;
        }
    }

    for(var k = 0; k < pack.stations.length; k++) {
        var r = pack.stations[k];
        var station = Station.list[r.id];
        if(station) {
            if(r.x != undefined)
                station.x = r.x;
            if(r.y != undefined)
                station.y = r.y;
        }
    }

});

socket.on('delPack', function(pack) {
    for(var i = 0; i < pack.players.length; i++)
        delete Player.list[pack.players[i]];

    for(var j = 0; j < pack.projectiles.length; j++)
        delete Projectile.list[pack.projectiles[j]];
});

setInterval(function() {
    if(!ownId)
        return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(var pl in Player.list)
        Player.list[pl].draw();

    for(var pr in Projectile.list)
        Projectile.list[pr].draw();

    for(var st in Station.list)
        Station.list[st].draw();

}, 40);