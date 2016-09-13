/**
 * Created by will on 25/07/16.
 */

var Entity = require('./entity.js');

var Station = function(name, x, y, area) {

    var Enemy = require('./enemy');
    var Team = require('./team.js');
    var Projectile = require('./projectile.js');

    var self = Entity();

    //Station Name
    self.id = Math.random();
    self.name = name;
    self.credits = 999999999;

    self.x = x;
    self.y = y;

    self.w = 200;
    self.h = 200;

    //Colour (Temporary!)
    self.r = 70;
    self.g = 78;
    self.b = 88;

    self.area = area;

    self.team = Team.list['players'];
    self.playerNear = false;
    self.target = null;
    self.canShoot = true;

    //Pack funcs
    self.getInitPack = function() {
        return {
            id: self.id,
            name: self.name,
            x: self.x,
            y: self.y,
            w: self.w,
            h: self.h,
            r: self.r,
            g: self.g,
            b: self.b,
            area: self.area,
            storage: self.storage.contents
        }
    };

    self.getUpdatePack = function() {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            storage: self.storage.contents
        }
    };

    self.calculateValues = function() {
        for(var i in self.storage.contents) {
            var item = self.storage.contents[i];
            if(item.amount > 1) {
                if(item.rval > item.minval && item.rval < item.maxval) {
                    item.rval = item.bval - Math.floor((item.amount * (item.bval/1000)+0.5));
                    if(item.rval <= 0)
                        item.rval = item.minval;
                }
            } else {
                item.rval = item.bval;
            }
        }
    };
    //Functions
    var superUpdate = self.update;

    self.update = function() {
        superUpdate();
        self.calculateValues();

        self.checkForPlayer();

        if(self.target != null && self.canShoot) {
            self.angle = self.getAngle(self.target);

            if(self.canShoot && self.target.shields < 100) {
                //self.pew(self.angle);
                self.canShoot = false;
                setTimeout(function() {
                    self.canShoot = true;
                }, 500);
            }
        }
    };

    self.checkForPlayer = function() {
        for(var p in Enemy.list) {
            if(self.area == Enemy.list[p].area && self.getDistance(Enemy.list[p]) < 500) {
                self.playerNear = true;
                self.target = Enemy.list[p];
                return;
            } else {
                self.playerNear = false;
            }
        }
        if(self.target != null && self.playerNear == false) {
            self.target = null;
        }
    };

    self.pew = function(angle) {
        var p = Projectile(self, angle);
        p.area = self.area;
        p.team = Team.list['players'];
        p.x = self.x + self.w/2;
        p.y = self.y + self.h/2;
    };

    Station.list[self.id] = self;

    return self;
};

Station.list = {};
Station.getAllPacks = function() {
    var stations = [];
    for(var s in Station.list)
        stations.push(Station.list[s].getInitPack());
    return stations;
};
Station.update = function() {
    var pack = [];

    for(var s in Station.list) {

        var station = Station.list[s];

        station.update();

        pack.push(station.getUpdatePack());
    }
    return pack;
};

module.exports = Station;