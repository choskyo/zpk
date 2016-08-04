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

    self.shields = initPack.shields;
    self.maxShields = initPack.maxShields;

    self.draw = function() {
        var x = self.x - Player.list[ownId].x + canvas.width/2 - Player.list[ownId].w/2;
        var y = self.y - Player.list[ownId].y + canvas.height/2 - Player.list[ownId].h/2;

        ctx.fillStyle = 'rgb(' + self.r + ',' + self.g + ',' + self.b + ')';
        ctx.fillRect(x, y, self.w, self.h);
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, self.w, self.h);

        var barWidth = 100 * self.shields / self.maxShields;

        ctx.fillStyle = "darkblue";
        ctx.fillRect(x, y - 40, 100, 6);

        ctx.fillStyle = "lightblue";
        ctx.fillRect(x, y - 40, barWidth, 6);

        shields.innerHTML = "Shields: " + Player.list[ownId].shields.toString();
    };

    Player.list[self.id] = self;

    return self;
};

Player.list = {};