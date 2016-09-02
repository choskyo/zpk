/**
 * Created by will on 01/09/16.
 */
var Entity = require('./entity.js');
var Team = require('./team.js');
var Storage = require('./../items/storage');
var Player = require('./player.js');
var Station = require('./station.js');

//Player Object
var Enemy = function() {
    var Projectile = require('./projectile.js');
    var self = Entity();

    //Client ID
    self.id         = Math.random();
    self.name   = "Pirate" + self.id.toString().slice(1,4);

    self.x = Math.random()*1000;
    self.y = Math.random()*1000;

    self.storage = new Storage(self);
    self.credits = Math.floor(Math.random()*500)+1;

    self.w = 30;
    self.h = 15;

    self.playerNear = false;
    self.target = null;

    //Colour (Temporary!)
    self.r          = 255;
    self.g          = 0;
    self.b          = 0;

    //Misc info
    self.team = Team.list['pirates'];
    self.maxShields = 3;
    self.shields = 3;
    self.canShoot = true;

    self.speed      = 0;
    self.maxSpeed   = 4;

    //Pack funcs
    self.getInitPack = function() {
        return {
            id: self.id,
            name: self.name,
            credits: self.credits,
            x: self.x,
            y: self.y,
            w: self.w,
            h: self.h,
            r: self.r,
            g: self.g,
            b: self.b,
            shields: self.shields,
            maxShields: self.maxShields,
            storage: self.storage.contents,
            area: self.area
        }
    };

    self.getUpdatePack = function() {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            r: self.r,
            g: self.g,
            b: self.b,
            shields: self.shields,
            storage: self.storage.contents,
            credits: self.credits,
            angle: self.angle
        }
    };

    //Functions
    var superUpdate = self.update;

    self.update = function() {
        superUpdate();

        self.updateSpeed();

        self.checkForPlayer();

        if(self.target != null && self.canShoot) {
            if(self.canShoot && self.target.shields < 100) {
                self.pew(self.getAngle(self.target));
                self.canShoot = false;
                setTimeout(function() {
                    self.canShoot = true;
                }, 500);
            }
        }
    };

    self.checkForPlayer = function() {
        for(var p in Player.playerList) {
            if(self.area == Player.playerList[p].area && self.getDistance(Player.playerList[p]) < 500) {
                self.playerNear = true;
                self.target = Player.playerList[p];
                return;
            } else {
                self.playerNear = false;
            }
        }
        if(self.target != null && self.playerNear == false) {
            for(var st in Station.list) {
                if(Station.list[st].area == self.area) {
                    self.target = Station.list[st];
                }
            }
        }
    };

    self.pew = function(angle) {
        var p = Projectile(self, angle);
        p.area = self.area;
        p.team = self.team;
        p.x = self.x + self.w/2;
        p.y = self.y + self.h/2;
    };

    self.updateSpeed = function() {

        if(self.target == null) return;

        if(self.angle >= self.getAngle(self.target) + 6) {
            if(self.angle < 360 && self.angle > -360)
                self.angle -= 4;
            else
                self.angle = 0;
        } else if (self.angle <= self.getAngle(self.target) - 6) {
            if(self.angle < 360 && self.angle > -360)
                self.angle += 4;
            else
                self.angle = 0;
        } else {
            self.angle += 0;
        }

        var degX = Math.cos(self.angle/180*Math.PI) *0.25 ;
        var degY = Math.sin(self.angle/180*Math.PI) *0.25 ;

        if(self.speedX > -self.maxSpeed && self.speedX < self.maxSpeed) {
            self.speedX += degX;
        } else if (self.speedX <= -self.maxSpeed && degX > 0) {
            self.speedX += degX;
        }
        else if (self.speedX >= self.maxSpeed && degX < 0) {
            self.speedX += degX;
        }

        if(self.speedY >= -self.maxSpeed && self.speedY < self.maxSpeed) {
            self.speedY += degY;
        }
        else if (self.speedY <= -self.maxSpeed && degY > 0) {
            self.speedY += degY;
        }
        else if (self.speedY > self.maxSpeed && degY < 0) {
            self.speedY += degY;
        }
    };

    self.respawn = function() {
        self.speedX = 0;
        self.speedY = 0;
        self.x = Math.random()*500;
        self.y = Math.random()*500;
        self.shields = self.maxShields;
    };

    Enemy.list[self.id] = self;

    return self;
};

//Static methods
exports.enemyList = Enemy.list = {};
Enemy.getAllPacks = function() {
    var enemies = [];
    for(var p in Enemy.list)
        enemies.push(Enemy.list[p].getInitPack());
    return enemies;
};
Enemy.update = function() {
    var pack = [];
    for(var p in Enemy.list){
        var player = Enemy.list[p];

        //Check what's going on
        player.update();

        //Push data to packet
        pack.push(player.getUpdatePack());
    }
    return pack;
};

module.exports = Enemy;