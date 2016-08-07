/**
 * Created by will on 07/08/16.
 */
var Wormhole = function(initPack) {
    var self = {};
    self.id = initPack.id;
    self.x = initPack.x;
    self.y = initPack.y;
    self.w = initPack.w;
    self.h = initPack.h;
    self.r = initPack.r;
    self.g = initPack.g;
    self.b = initPack.b;
    self.area = initPack.area;
    self.destination = initPack.destination;

    self.draw = function() {

        if(Player.list[ownId].area != self.area)
            return;

        var x = self.x - Player.list[ownId].x + canvas.width/2 - Player.list[ownId].w/2;
        var y = self.y - Player.list[ownId].y + canvas.height/2 - Player.list[ownId].h/2;

        ctx.beginPath();
        ctx.fillStyle = 'rgb(' + self.r + ',' + self.g + ',' + self.b + ')';
        ctx.arc(x, y,self.w,0,2*Math.PI);
        ctx.fill();
    };

    Wormhole.list[self.id] = self;

    return self;
};

Wormhole.list = {};