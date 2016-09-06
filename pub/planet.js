/**
 * Created by will on 19/08/16.
 */
/**
 * Created by will on 24/07/16.
 */
var Planet = function (initPack) {
    var self = {};
    self.id = initPack.id;
    self.name = initPack.name;
    self.credits = initPack.credits;
    self.x = initPack.x;
    self.y = initPack.y;
    self.cX = initPack.cX;
    self.cY = initPack.cY;
    self.rad= initPack.rad;
    self.pathRad = initPack.pathRad;

    self.r = initPack.r;
    self.g = initPack.g;
    self.b = initPack.b;

    self.area = initPack.area;

    self.draw = () => {
        if(Player.list[ownId].area != self.area)
            return;

        var x = self.x - Player.list[ownId].x + canvas.width/2 - Player.list[ownId].w/2;
        var y = self.y - Player.list[ownId].y + canvas.height/2 - Player.list[ownId].h/2;

        var cX = self.cX - Player.list[ownId].x + canvas.width/2 - Player.list[ownId].w/2;
        var cY = self.cY - Player.list[ownId].y + canvas.height/2 - Player.list[ownId].h/2;

        //stroke
        ctx.beginPath();
        ctx.arc(cX, cY, self.pathRad, 0, 2*Math.PI);
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#FFF';
        ctx.drawImage(planet2, x - planet2.width/2, y - planet2.height/2);
        ctx.stroke();

    };

    Planet.list[self.id] = self;

    return self;
};

Planet.list = {};