Rect = function(x, y, w, h) {

    if (x== null || y == null || w == null || h == null)
        alert("Rectangle properties set incorrectly");

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.intersects = function(shape){
        var offset = 0;direction

        if(shape.radius != null)
            offset = shape.radius;

        if(this.contains(shape.x - offset, shape.y - offset) || this.contains(shape.x + shape.width - offset, shape.y - offset) ||
            this.contains(shape.x - offset, shape.y + shape.height - offset) || this.contains(shape.x + shape.width - offset, shape.y + shape.height - offset)) {
            return true;}

        else if ((shape.contains(this.x - offset, this.y - offset) || shape.contains(this.x + this.width - offset, this.y - offset) ||
            shape.contains(this.x - offset, this.y + this.height - offset) || shape.contains(this.x + this.width - offset, this.y + this.height - offset)))
            return true;

        return false;
    };

    this.contains = function(posx, posy) {
        return(posx >= this.x && posy >= this.y && posx <= this.x + this.w && posy <= this.y + this.h)
    };

    this.draw = function(ctx, colour) {
        ctx.fillStyle = colour;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
};