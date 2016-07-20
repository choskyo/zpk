/**
 * Created by will on 14/07/16.
 */

var socket = io('http://localhost:80');

var canvas = document.getElementById("canvas");
var ctx = document.getElementById("canvas").getContext("2d");
ctx.font = '30px Arial';

document.onmousedown = function(event){socket.emit('keyPress',{inputId:'attack',state:true});
};
document.onmouseup = function(event){
    socket.emit('keyPress',{inputId:'attack',state:false});
};
document.onmousemove = function(event){
    var x = -250 + event.clientX - 8;
    var y = -250 + event.clientY - 8;
    var angle = Math.atan2(y,x) / Math.PI * 180;
    socket.emit('keyPress',{inputId:'mouseAngle',state:angle});
};
document.onkeydown = function(event){
    if(event.keyCode === 68)	//d
        socket.emit('keyPress',{inputId:'right',state:true});
    else if(event.keyCode === 83)	//s
        socket.emit('keyPress',{inputId:'down',state:true});
    else if(event.keyCode === 65) //a
        socket.emit('keyPress',{inputId:'left',state:true});
    else if(event.keyCode === 87) // w
        socket.emit('keyPress',{inputId:'up',state:true});

};
document.onkeyup = function(event){
    if(event.keyCode === 68)	//d
        socket.emit('keyPress',{inputId:'right',state:false});
    else if(event.keyCode === 83)	//s
        socket.emit('keyPress',{inputId:'down',state:false});
    else if(event.keyCode === 65) //a
        socket.emit('keyPress',{inputId:'left',state:false});
    else if(event.keyCode === 87) // w
        socket.emit('keyPress',{inputId:'up',state:false});
};


socket.on('nP',function(data){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(var i = 0 ; i < data.length; i++) {
        console.log('rgb = ' + data[i].r + data[i].g + data[i].b);
        ctx.fillStyle = 'rgb(' + data[i].r + ',' + data[i].g + ',' + data[i].b + ')';
        ctx.fillRect(data[i].x, data[i].y, 100, 60);
    }
});