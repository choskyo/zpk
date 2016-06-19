Sprite = function(x, y) {

    if (x== null || y == null)
        alert("Sprite properties set incorrectly");

    this.x = x;
    this.y = y;

    this.draw = function(ctx, image) {
        var img = new Image();
        img.src = image;
        
        var pat = ctx.createPattern(img, "no-repeat");
        ctx.rect(this.x, this.y, img.width, img.height);
        ctx.fillStyle = pat;
        ctx.fill();
        ctx.drawImage(img, "no-repeat");
    }
};