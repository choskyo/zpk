/**
 * Created by will on 27/07/16.
 */

var Entity = require('./entity.js');
var Player = require('./player.js');
var Pack = require('./pack.js');

var Projectile = function(p, ang) {

    var self = Entity();

    //Projectile ID
    self.id         = Math.random();
    self.parentId = p;

    self.w = 10;
    self.h = 10;

    //Overwrite speed vars
    self.speedX = Math.cos(ang/180*Math.PI) * 10;
    self.speedY = Math.sin(ang/180*Math.PI) * 10;

    //Colour (Temporary!)
    self.r          = 0;
    self.g          = 125;
    self.b          = 255;

    //Projectile specific
    self.timeToKill = 0;
    self.remove = 0;

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
            b: self.b
        }
    };

    self.getUpdatePack = function() {
        return {
            id: self.id,
            x: self.x,
            y: self.y
        }
    };

    var superUpdate = self.update;

    self.update = function() {
        superUpdate();

        for(var player in Player.playerList) {
            var p = Player.playerList[player];
            
            if(self.intersects(p) && self.parentId != p.id) {
                self.remove = 1;
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