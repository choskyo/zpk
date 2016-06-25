Sprite = function(x, y) {

    if (x== null || y == null)
        alert("Sprite properties set incorrectly");

    this.x = x;
    this.y = y;

    this.draw = function(ctx, image) {
        var img = new Image();
        img.src = image;
    
        ctx.drawImage(img, this.x, this.y);
    }
}