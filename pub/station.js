/**
 * Created by will on 03/08/16.
 */
var Station = function(initPack) {
    var self = {};
    self.id = initPack.id;
    self.x = initPack.x;
    self.y = initPack.y;
    self.w = initPack.w;
    self.h = initPack.h;
    self.r = initPack.r;
    self.g = initPack.g;
    self.b = initPack.b;
    self.angle = 1;

    self.draw = function() {
        var x = self.x - Player.list[ownId].x + canvas.width/2 - Player.list[ownId].w/2;
        var y = self.y - Player.list[ownId].y + canvas.height/2 - Player.list[ownId].h/2;

        if(self.angle < 360)
            self.angle++;
        else
            self.angle=1;

        ctx.save();
        ctx.beginPath();
        ctx.translate(x + self.w/ 2, y + self.h/ 2);
        ctx.rotate(self.angle * Math.PI / 180);
        ctx.rect(-self.w / 2, -self.h / 2, self.w, self.h);
        ctx.fillStyle = 'rgb(' + self.r + ',' + self.g + ',' + self.b + ')';
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 5;
        ctx.strokeRect(-self.w / 2, -self.h / 2, self.w, self.h);
        ctx.fill();
        ctx.restore();
    };



    Station.list[self.id] = self;

    return self;
};

Station.list = {};