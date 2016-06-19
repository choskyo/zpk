Player = function(params) {

    var velX=0;
    var velY=0;
    var maxVel=10;
    var name="player";

    function update() {
        if(event.keyCode == 87)
            velX++; 
        
        if(event.keyCode == 83)
            velX--;
        
        if(event.keyCode == 65)
            velY--;

        if(event.keyCode == 68)
            velY++;
    }

    this.draw = function(ctx) {
        ctx.drawImage()
    }

}