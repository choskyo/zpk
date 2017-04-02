/**
 * Created by will on 27/07/16.
 */

var Entity = require('./entity.js');
var Player = require('./player.js');
var Pack = require('./../data/pack.js');
var Enemy = require('./enemy');
var Team = require('./team');

var Projectile = function(p, ang) {

    var self = Entity();

    //Projectile ID
    self.id         = Math.random();
    self.parent = p;
    self.parentId = p.id;

    self.w = 4;
    self.h = 4;

    //Overwrite speed vars
    self.speedX = Math.cos(p.angle/180*Math.PI) * 10 + p.speedX;
    self.speedY = Math.sin(p.angle/180*Math.PI) * 10 + p.speedY;

    //Colour (Temporary!)
    self.r          = 0;
    self.g          = 255;
    self.b          = 0;

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

        if(self.team != Team.list['players']) {
            for(var player in Player.playerList) {
                var p = Player.playerList[player];

                if(self.intersects(p) && self.parentId != p.id && p.area == self.area && p.team != self.team && p.team.canPvP && !p.docked) {
                    p.shields -= self.parent.eqWeapon.damage;

                    if(p.shields <= 0) {
                        Team.list['pirates'].addScore();
                        //self.team.addScore();
                        p.respawn();
                    }

                    self.remove = 1;
                }
            }
        } else {
            for(var e in Enemy.list) {
                var enemy = Enemy.list[e];

                if(self.intersects(enemy) && self.parentId != enemy.id && enemy.area == self.area && enemy.team != self.team) {
                    enemy.shields -= self.parent.eqWeapon.damage;

                    if(enemy.shields <= 0) {
                        self.team.addScore();
                        enemy.respawn();
                    }

                    self.remove = 1;
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