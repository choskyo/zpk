Vector2 = function(x, y)
{
    this.x = 0;
    this.y = 0;

    if(x != null)
        this.x = x;

    if(y != null)
        this.y = y;

    this.prevX = 0;
    this.prevY = 0;

    this.set = function(x, y) {
        this.prevX = this.x;
        this.prevY = this.y;

        if(x!= null)
            this.x = x;
        if(y!= null)
            this.y = y;
    };

    this.normalize = function() {
        var temp = new Vector2(this.x, this.y);

        var mag = Math.sqrt((temp.x * temp.x) + (temp.y * temp.y));
        temp.x = temp.x / mag;
        temp.y = temp.y / mag;

        return temp;
    };

    this.distance = function(vec2) {
        if(vec2 != null)
            return Math.sqrt(((vec2.x - this.x ) * (vec2.x - this.x)) + ((this.y - vec2.y) * (this.y - vec2.y)));
        else
            return Math.sqrt(((this.prevX - this.x ) * (this.prevX - this.x)) + ((this.y - this.prevY) * (this.y - this.prevY)));
    }
};