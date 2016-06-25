Background = function() {

    this.draw = function(ctx, image) {
        var img = new Image();
        img.src = image;

        var pat=ctx.createPattern(img,"repeat");
        ctx.rect(0,0,canvas.width,canvas.tile);
        ctx.fillStyle=pat;
        ctx.fill();
    }
};