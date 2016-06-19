var canvas          =   document.getElementById("game");
canvas.width        =   document.body.clientWidth;
canvas.height       =   document.body.clientHeight;
canvas.style.width  =   canvas.width + 'px';
canvas.style.height =   canvas.height + 'px';

var ctx             =   canvas.getContext('2d');

var rect = new Rect(15, 15, 50, 50);
var rect2 = new Rect(115, 15, 50, 50);
var rect3 = new Rect(215, 15, 50, 50);

var sprite1 = new Sprite(0, 0);

var movedir = -1;

setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rect.draw(ctx, 'black');
    rect2.draw(ctx, 'red');
    rect3.draw(ctx, 'blue');

    sprite1.draw(ctx, '1.png');

    rect2.x += movedir;

    if(rect2.intersects(rect))
        movedir = 1;

    if(rect2.intersects(rect3))
        movedir = -1;

}, 33);