/**
 * Created by will on 24/07/16.
 */
var Player = function (initPack) {
    var self = {};
    self.id = initPack.id;
    self.name = initPack.name;
    self.credits = initPack.credits;
    self.x = initPack.x;
    self.y = initPack.y;
    self.w = initPack.w;
    self.h = initPack.h;
    self.angle = initPack.angle;
    self.docked = false;
    self.dockedAt = initPack.dockedAt;
    self.flick = false;

    self.r = initPack.r;
    self.g = initPack.g;
    self.b = initPack.b;

    self.shields = initPack.shields;
    self.maxShields = initPack.maxShields;
    self.credits = initPack.credits;

    self.storage = initPack.storage;

    self.area = initPack.area;

    self.draw = () => {
        var x = self.x - Player.list[ownId].x + canvas.width/2 - Player.list[ownId].w/2;
        var y = self.y - Player.list[ownId].y + canvas.height/2 - Player.list[ownId].h/2;



        ctx.save();
        ctx.beginPath();
        ctx.translate(x + self.w/ 2, y + self.h/ 2);
        ctx.rotate(self.angle * Math.PI / 180);
        ctx.moveTo(self.w/2, 0);
        ctx.lineTo(-self.w/2, -self.h/2);
        ctx.lineTo(-self.w/2, self.h/2);
        ctx.closePath();
        ctx.fillStyle = 'rgb(' + self.r + ',' + self.g + ',' + self.b + ')';
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(0-Player.list[ownId].x + canvas.width/2, - Player.list[ownId].y + canvas.height/2,2500,0,2*Math.PI);
        ctx.strokeStyle = '#F00';
        ctx.stroke();

        var barWidth = 30 * self.shields / self.maxShields;

        ctx.fillStyle = "darkblue";
        ctx.fillRect(x, y - 30, 30, 6);

        ctx.fillStyle = "lightblue";
        ctx.fillRect(x, y - 30, barWidth, 6);

        shields.innerHTML = "Shields: " + Player.list[ownId].shields.toString();
        credits.innerHTML = "Credits: " + Player.list[ownId].credits.toString();

        self.drawInventory();
        self.drawStationScreen();
    };

    self.drawStationScreen = () => {
        if(Player.list[ownId].docked && !Player.list[ownId].flick) {
            self.flick = true;
            var dockedStation = Station.list[Player.list[ownId].dockedAt];
            stationScreen.style.display = 'inline';

            stationTrade.innerHTML = "";

            stationName.innerHTML = dockedStation.name;

            var i = 0;

            for(var c in dockedStation.storage) {
                var commod = dockedStation.storage[c];
                i++;
                stationTrade.innerHTML += "<tr><td><input type='radio' name='tradeCommod' value='" + JSON.stringify(commod) + "' checked style='display:hidden' id='tradeCommod" + i + "'/>" + "</td>" +
                    "<td>" + commod.amount + "</td>" +
                    "<td>" + Player.list[ownId].storage[c].amount +"</td>" +
                    "<td>" + commod.rval +"</td>" +
                    "<td><label for='tradeCommod" + i + "'>" + commod.name + "</label></td>" +
                    "</tr>";
            }
        }

        else if(!Player.list[ownId].docked) {
            self.flick = false;
            stationScreen.style.display = 'none';
        }

    };

    self.drawInventory = () => {
        storage.innerHTML = '';

        for(var i in Player.list[ownId].storage) {
            storage.innerHTML += "<tr><td>" + Player.list[ownId].storage[i].amount + "</td><td>" + Player.list[ownId].storage[i].name + "</td> </tr>";
        }
    };

    self.intersects = function(e) {
        return !(e.x > self.x + self.w ||
        e.x + e.w < self.x ||
        e.y > self.y + self.h ||
        e.y + e.h < self.y);
    };

    Player.list[self.id] = self;

    return self;
};

Player.list = {};