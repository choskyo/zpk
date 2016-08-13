/**
 * Created by will on 24/07/16.
 */
var Player = function (initPack) {
    var self = {};
    self.id = initPack.id;
    self.name = initPack.name;
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

    self.draw = function() {
        var x = self.x - Player.list[ownId].x + canvas.width/2 - Player.list[ownId].w/2;
        var y = self.y - Player.list[ownId].y + canvas.height/2 - Player.list[ownId].h/2;

        //DRAW SUN(TEMP)
        ctx.beginPath();
        ctx.arc(0-Player.list[ownId].x + canvas.width/2, - Player.list[ownId].y + canvas.height/2, 300, 0, 2*Math.PI);
        ctx.fillStyle = "#FDB813";
        ctx.fill();

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
        ctx.arc(0-Player.list[ownId].x + canvas.width/2, - Player.list[ownId].y + canvas.height/2,1000,0,2*Math.PI);
        ctx.strokeStyle = '#F00';
        ctx.stroke();

        var barWidth = 30 * self.shields / self.maxShields;

        ctx.fillStyle = "darkblue";
        ctx.fillRect(x, y - 30, 30, 6);

        ctx.fillStyle = "lightblue";
        ctx.fillRect(x, y - 30, barWidth, 6);

        shields.innerHTML = "Shields: " + Player.list[ownId].shields.toString();

        self.drawInventory();
        self.drawStationScreen();
    };

    self.drawStationScreen = function() {
        if(self.docked && self.flick == false) {
            self.flick = true;
            var dockedStation = Station.list[Player.list[ownId].dockedAt];
            stationScreen.style.display = 'inline';

            stationBuy.innerHTML = "";
            stationSell.innerHTML = "";

            stationName = dockedStation.name;
            stationPlayerName.innerHTML = Player.list[ownId].name;

            for(var commod in dockedStation.storage) {
                stationBuy.innerHTML +=
                    "<div class='radio'>" +
                    "<label>" +
                    "<input type='radio' name='buyCommod' value='" + JSON.stringify(dockedStation.storage[commod]) + "' checked/>" +
                    dockedStation.storage[commod].name +
                    '</label>' +
                    '</div>';
            }

            for(var commod in Player.list[ownId].storage) {
                stationSell.innerHTML +=
                    "<div class='radio'>" +
                    "<label>" +
                    "<input type='radio' name='sellCommod' value='" + JSON.stringify(Player.list[ownId].storage[commod]) + "' checked/>" +
                    Player.list[ownId].storage[commod].name +
                    '</label>' +
                    '</div>';
            }

        }

        else if(!self.docked) {
            self.flick = false;
            stationScreen.style.display = 'none';
        }

    };

    self.drawInventory = function() {
        storage.innerHTML = '<div id="items" style="opacity: 1; color: white; margin: 10px 0 0 0; font:18pt bold arial">----items----</div>'

        for(var i in Player.list[ownId].storage) {
            storage.innerHTML += "<div style='font: 12pt arial bold'>" + '[' + Player.list[ownId].storage[i].amount + '] ' + Player.list[ownId].storage[i].name + "</div>";
        }
    };

    

    Player.list[self.id] = self;

    return self;
};

Player.list = {};