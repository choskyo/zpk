/**
 * Created by will on 01/09/16.
 */
var Enemy = function(initPack) {
    var self = {};
    self.id = initPack.id;
    self.name = initPack.name;
    self.credits = initPack.credits;
    self.x = initPack.x;
    self.y = initPack.y;
    self.w = initPack.w;
    self.h = initPack.h;
    self.angle = initPack.angle;

    self.r = initPack.r;
    self.g = initPack.g;
    self.b = initPack.b;

    self.shields = initPack.shields;
    self.maxShields = initPack.maxShields;
    self.credits = initPack.credits;

    self.storage = initPack.storage;

    self.area = initPack.area;

    self.draw = function() {

        if(Player.list[ownId].area != self.area)
            return;

        var x = self.x - Player.list[ownId].x + canvas.width/2 - Player.list[ownId].w/2;
        var y = self.y - Player.list[ownId].y + canvas.height/2 - Player.list[ownId].h/2;

        ctx.save();
        ctx.translate(x + self.w/2, y + self.h/2);
        ctx.rotate(self.angle * Math.PI / 180);
        ctx.drawImage(ship, 0-self.w/2, 0-self.h/2);
        ctx.restore();

        var barWidth = 30 * self.shields / self.maxShields;

        ctx.fillStyle = "darkblue";
        ctx.fillRect(x, y - 30, 30, 6);

        ctx.fillStyle = "lightblue";
        ctx.fillRect(x, y - 30, barWidth, 6);

        ctx.font = "bold 14pt Arial";
        ctx.fillStyle="white";
        ctx.strokeStyle="black";
        ctx.lineWidth=1;
        ctx.textAlign = 'center';
        ctx.fillText(self.name, x, y + 50);
        ctx.strokeText(self.name, x, y + 50);

    };

    Enemy.list[self.id] = self;

    return self;
};

Enemy.list = {};