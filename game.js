var canvas          =   document.getElementById("game");
canvas.width        =   document.body.clientWidth;
canvas.height       =   document.body.clientHeight;
canvas.style.width  =   canvas.width + 'px';
canvas.style.height =   canvas.height + 'px';

var ctx             =   canvas.getContext('2d');

var rect = new Rect(200, 205, 50, 50);

var bg = new Background();

setInterval(function() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bg.draw(ctx, 'zebu.png');

    rect.draw(ctx, 'red');

}, 33);