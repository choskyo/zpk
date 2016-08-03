/**
 * Created by will on 14/07/16.
 */

var socket = io('http://localhost:3000');

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
        y: event.clientY
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


socket.on('initPack', function(pack) {
    for(var pl =0; pl < pack.players.length; pl++)
        new Player(pack.players[i]);

    for(var pr =0; pr < pack.projectiles.length; pr++)
        new Projectile(pack.projectiles[i]);
});

socket.on('updatePack', function(pack) {
    for(var pl = 0; pl < pack.players.length; pl++) {
        var packPlayer = pack.players[pl];
        var player = Player.list[packPlayer.id];
        if(player) {
            if(packPlayer.x != undefined)
                player.x = packPlayer.x;
            if(packPlayer.y != undefined)
                player.y = packPlayer.y;
        }
    }

    for(var pr = 0; pr < pack.projectiles.length; pr++) {
        var packProj = pack.projectiles[pr];
        var projectile = Projectile.list[packProj.id];
        if(projectile) {
            if(packProj.x != undefined)
                projectile.x = packProj.x;
            if(packProj.y != undefined)
                projectile.y = packProj.y;
        }
    }

});

socket.on('delPack', function(pack) {
    for(var pl = 0; pl < pack.players.length; pl++)
        delete Player.list[pack.players[pl]];

    for(var pr = 0; pr < pack.projectiles.length; pl++)
        delete Projectile.list[pack.projectiles[pr]];
});

setInterval(function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(var pl in Player.list)
        ctx.fillRect(pl.x, pl.y, pl.w, pl.h);

    for(var pr in Projectile.list)
        ctx.fillRect(pr.x, pr.y, pr.w, pr.h);

}, 40);

function drawRotatedRect(x, y, width, height, degrees) {

    // first save the untranslated/unrotated context
    ctx.save();

    ctx.beginPath();
    // move the rotation point to the center of the rect
    ctx.translate(x + width / 2, y + height / 2);
    // rotate the rect
    ctx.rotate(degrees * Math.PI / 180);

    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
    ctx.rect(-width / 2, -height / 2, width, height);

    ctx.fillStyle = "gold";
    ctx.fill();

    // restore the context to its untranslated/unrotated state
    ctx.restore();

}