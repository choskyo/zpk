/**
 * Created by will on 24/07/16.
 */
var Player = function (initPack) {
    var self = {};
    self.id = initPack.id;
    self.x = initPack.x;
    self.y = initPack.y;
    self.w = initPack.w;
    self.h = initPack.h;

    self.r = initPack.r;
    self.g = initPack.g;
    self.b = initPack.b;

    self.draw = function() {
        ctx.fillStyle = 'rgb(' + self.r + ',' + self.g + ',' + self.b + ')';
        ctx.fillRect(self.x, self.y, self.w, self.h);
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 5;
        ctx.strokeRect(self.x, self.y, self.w, self.h);
    };

    Player.list[self.id] = self;

    return self;
};

Player.list = {};