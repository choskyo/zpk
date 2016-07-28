/**
 * Created by will on 27/07/16.
 */

var Entity = require('./entity.js');

var Projectile = function(ang) {

    var self = Entity();

    //Client ID
    self.id         = Math.random();

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

    var superUpdate = self.update;
    self.update = function() {
        if(self.timeToKill++ > 40) {
            self.remove = 1;
        }
        superUpdate();
    };

    Projectile.list[self.id] = self;
    return self;
};

Projectile.list = {};
Projectile.update = function() {

    var pack = [];
    for(var p in Projectile.list){
        var proj = Projectile.list[p];

        //Check what's going on
        proj.update();

        //Push data to packet
        pack.push({
            x:proj.x,
            y:proj.y,
            r:proj.r,
            g:proj.g,
            b:proj.b
        });
    }
    return pack;
};

module.exports = Projectile;