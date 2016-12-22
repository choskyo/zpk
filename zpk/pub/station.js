/**
 * Created by will on 03/08/16.
 */
var Station = function(initPack) {
    var self = {};
    self.id = initPack.id;
    self.name = initPack.name;
    self.x = initPack.x;
    self.y = initPack.y;
    self.w = initPack.w;
    self.h = initPack.h;
    self.r = initPack.r;
    self.g = initPack.g;
    self.b = initPack.b;
    self.angle = 1;
    self.area = initPack.area;
    self.storage = initPack.storage;

    self.draw = function() {

        if(Player.list[ownId].area != self.area)
            return;

        var x = self.x - Player.list[ownId].x + canvas.width/2 - Player.list[ownId].w/2;
        var y = self.y - Player.list[ownId].y + canvas.height/2 - Player.list[ownId].h/2;

        if(self.angle < 360)
            self.angle+=0.25;
        else
            self.angle=1;

        ctx.save();
        ctx.translate(x + self.w/2, y + self.h/2);
        ctx.rotate(self.angle * Math.PI / 180);
        ctx.drawImage(station, 0-self.w/2, 0-self.h/2);
        ctx.restore();

        ctx.font = "bold 18pt Arial";
        ctx.fillStyle="white";
        ctx.strokeStyle="black";
        ctx.lineWidth=1;
        ctx.textAlign = 'center';
        ctx.fillText(self.name, x + self.w/2, y + 50);
        ctx.strokeText(self.name, x + self.w/2, y + 50);
    };

    Station.list[self.id] = self;

    return self;
};

Station.list = {};