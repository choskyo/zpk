Player = function(image) {



    var pX = 0;
    var pY = 0;

    var vX = 0;
    var vY = 0;

    var img = new Image();
    img.src = image;

    this.checkMovement = function(){

        
/*
        if(evt == 38) {
            vY += 5;
        }
        if(evt == "37") {
            vX += -5;
        }
        if(evt == "40"){
            vY += -5;
        }
        if(evt == "39") {
            vX += 5;
        }

        if(vX != 0) {
            pX += vX;
        }
        if(vY != 0) {
            pY += vY;
        }*/
    };

    this.draw = function(ctx) {
            ctx.drawImage(img, pX, pY);
    }
};