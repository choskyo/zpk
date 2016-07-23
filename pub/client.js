/**
 * Created by will on 14/07/16.
 */

var socket = io('http://localhost:80');

var canvas = document.getElementById("canvas");
var ctx = document.getElementById("canvas").getContext("2d");
ctx.font = '30px Arial';

document.onmousedown = function(event){
    socket.emit('kP',{inputId:'attack',state:true});
};
document.onmouseup = function(event){
    socket.emit('kP',{inputId:'attack',state:false});
};
document.onmousemove = function(event){
    var x = -250 + event.clientX - 8;
    var y = -250 + event.clientY - 8;
    var angle = Math.atan2(y,x) / Math.PI * 180;
    socket.emit('kP',{inputId:'mouseAngle',state:angle});
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


socket.on('nP',function(data){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(var i = 0 ; i < data.length; i++) {
        ctx.fillStyle = 'rgb(' + data[i].r + ',' + data[i].g + ',' + data[i].b + ')';
        ctx.fillRect(data[i].x, data[i].y, 100, 60);
    }
});