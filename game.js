var canvas          =   document.getElementById("game");
canvas.width        =   1920;
canvas.height       =   1080;
canvas.style.width  =   canvas.width + 'px';
canvas.style.height =   canvas.height + 'px';

var ctx             =   canvas.getContext('2d');

var rect = new Rect(200, 205, 50, 50);

var bg = new Background('Assets/Graphics/stars.jpg');

var planet = new Sprite(500, 600);

var player = new Player('Assets/Graphics/zebum.png');

var zebu = new Image();
zebu.src = 'Assets/Graphics/zebu.png';

setInterval(function() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bg.draw(ctx);

    planet.draw(ctx, 'Assets/Graphics/p7.png');

    ctx.drawImage(zebu, 400, 500);

    rect.draw(ctx, 'red');

    player.draw(ctx);
    player.checkMovement(player);

}, 33);

$(document).keydown(function( event ) {
    if ( event.which == 38 ) {
        player.pX -= 5;
    }
});