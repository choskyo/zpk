/**
 * Created by will on 27/07/16.
 */

var Entity = require('./entity.js');
var Player = require('./player.js');
var Pack = require('./../data/pack.js');

var Projectile = function(p, ang) {

    var self = Entity();

    //Projectile ID
    self.id         = Math.random();
    self.parentId = p;

    self.w = 10;
    self.h = 10;

    //Overwrite speed vars
    self.speedX = Math.cos(Player.playerList[self.parentId].angle/180*Math.PI) * 20 + Player.playerList[self.parentId].speedX;
    self.speedY = Math.sin(Player.playerList[self.parentId].angle/180*Math.PI) * 20 + Player.playerList[self.parentId].speedY;

    //Colour (Temporary!)
    self.r          = 0;
    self.g          = 125;
    self.b          = 255;

    //Projectile specific
    self.timeToKill = 0;
    self.remove = 0;
    self.maxShields = 1;
    self.shields = 1;

    //Pack funcs
    self.getInitPack = function() {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            w: self.w,
            h: self.h,
            r: self.r,
            g: self.g,
            b: self.b,
            shields: self.shields,
            maxShields: self.maxShields,
            area: self.area
        }
    };

    self.getUpdatePack = function() {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            shields: self.shields,
            area: self.area
        }
    };

    var superUpdate = self.update;

    self.update = function() {
        superUpdate();

        for(var player in Player.playerList) {
            var p = Player.playerList[player];

            if(self.intersects(p) && self.parentId != p.id && p.area == self.area) {
                p.shields -= 1;
                self.remove = 1;

                if(p.shields <= 0) {
                    p.respawn();
                }
            }
        }

        if(self.timeToKill++ > 30) {
            self.remove = 1;
        }
    };

    Projectile.list[self.id] = self;
    Pack.initPack.projectiles.push(self.getInitPack());
    return self;
};

Projectile.list = {};
Projectile.getAllPacks = function() {
    var projectiles = [];
    for(var p in Projectile.list)
        projectiles.push(Projectile.list[p].getInitPack());
    return projectiles;
};
Projectile.update = function() {

    var pack = [];
    for(var p in Projectile.list){
        var proj = Projectile.list[p];

        //Check what's going on
        proj.update();

        if(proj.remove == 1) {
            Pack.delPack.projectiles.push(proj.id);
            delete Projectile.list[p];
        }
        else {
            //Push data to packet
            pack.push(proj.getUpdatePack());
        }


    }
    return pack;
};

module.exports = Projectile;