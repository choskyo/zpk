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
    self.angle = initPack.angle;

    self.r = initPack.r;
    self.g = initPack.g;
    self.b = initPack.b;

    self.shields = initPack.shields;
    self.maxShields = initPack.maxShields;

    self.storage = initPack.storage;

    self.area = initPack.area;

    self.draw = function() {
        var x = self.x - Player.list[ownId].x + canvas.width/2 - Player.list[ownId].w/2;
        var y = self.y - Player.list[ownId].y + canvas.height/2 - Player.list[ownId].h/2;

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

        /*
        ctx.fillStyle = 'rgb(' + self.r + ',' + self.g + ',' + self.b + ')';
        ctx.fillRect(x, y, self.w, self.h);
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, self.w, self.h);
*/
        var barWidth = 100 * self.shields / self.maxShields;

        ctx.fillStyle = "darkblue";
        ctx.fillRect(x, y - 60, 100, 6);

        ctx.fillStyle = "lightblue";
        ctx.fillRect(x, y - 60, barWidth, 6);

        shields.innerHTML = "Shields: " + Player.list[ownId].shields.toString();

        self.drawInventory();
    };

    self.drawInventory = function() {
        storage.innerHTML = '<div id="Items" style="opacity: 1; color: white; margin: 10px 0 0 0; font:18pt bold arial">----Items----</div>'

        for(var i in Player.list[ownId].storage) {
            storage.innerHTML += "<div style='font: 12pt arial bold'>" + '[' + Player.list[ownId].storage[i].amount + '] ' + Player.list[ownId].storage[i].name + "</div>";
        }
    };

    Player.list[self.id] = self;

    return self;
};

Player.list = {};