Background = function(graphic) {

    var gfx = new Image();
    gfx.src = graphic;

    this.draw = function(ctx) {

        var pat= ctx.createPattern(gfx, 'repeat');

        ctx.rect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle=pat;

        ctx.fill();
    }
}