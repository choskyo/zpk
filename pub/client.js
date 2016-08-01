/**
 * Created by will on 14/07/16.
 */

var socket = io('http://localhost:3000');

/**
 * Login
 */
var gameDiv         = document.getElementById("gameDiv");
var splashScreen    = document.getElementById("splashScreen");
var loginUsername   = document.getElementById("username");
var loginPassword   = document.getElementById("password");
var btnLogin        = document.getElementById("login");
var btnRegister     = document.getElementById("register");
var loginResponse   = document.getElementById("loginResponse");

btnLogin.onclick = function() {
    socket.emit('loginRequest', {username: loginUsername.value, password: loginPassword.value});
};
socket.on('loginResponse', function(response) {

    if(response.success == true) {
        splashScreen.style.display = 'none';
        gameDiv.style.display = 'inline';
    } else {
        loginResponse.innerHTML = "Login failed :(";
    }
});

btnRegister.onclick = function() {
    socket.emit('regRequest', {username: loginUsername.value, password: loginPassword.value});
};
socket.on('regResponse', function(response) {
    if(response.success == false) {
        loginResponse.innerHTML = "Username taken :(";
    } else {
        loginResponse.style.color = "#AFA";
        loginResponse.innerHTML = "Registration success! :D";
    }
});

/**
 * Game
 */
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


socket.on('updatePack',function(data){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for(let i = 0 ; i < data.player.length; i++) {
        ctx.fillStyle = 'rgb(' + data.player[i].r + ',' + data.player[i].g + ',' + data.player[i].b + ')';
        ctx.fillRect(data.player[i].x, data.player[i].y, 100, 60);
        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = 5;
        ctx.strokeRect(data.player[i].x, data.player[i].y, 100, 60);
    }

    for(let i = 0 ; i < data.projectile.length; i++) {
        ctx.fillStyle = 'rgb(' + data.projectile[i].r + ',' + data.projectile[i].g + ',' + data.projectile[i].b + ')';
        ctx.fillRect(data.projectile[i].x, data.projectile[i].y, 10, 10);
        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = 1;
        ctx.strokeRect(data.projectile[i].x, data.projectile[i].y, 10, 10);
    }

    for(let i = 0 ; i < data.station.length; i++) {
        ctx.fillStyle = 'rgb(' + data.station[i].r + ',' + data.station[i].g + ',' + data.station[i].b + ')';
        ctx.fillRect(data.station[i].x, data.station[i].y, data.station[i].w, data.station[i].h);
        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = 5;
        ctx.strokeRect(data.station[i].x, data.station[i].y, data.station[i].w, data.station[i].h);
    }
});

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