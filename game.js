var canvas          =   document.getElementById("game");
canvas.width        =   document.body.clientWidth;
canvas.height       =   document.body.clientHeight;
canvas.style.width  =   canvas.width + 'px';
canvas.style.height =   canvas.height + 'px';

var ctx             =   canvas.getContext('2d');

var rect = new Rect(200, 205, 50, 50);

var bg = new Background();

var planet = new Sprite(80, 20);

var zebu = new Image();
zebu.src = 'zebu.png';

setInterval(function() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bg.draw(ctx, 'Assets/Graphics/stars.gif');

    planet.draw(ctx, 'Assets/Graphics/p7.png');

    ctx.drawImage(zebu, 20, 20);

    rect.draw(ctx, 'red');

}, 33);