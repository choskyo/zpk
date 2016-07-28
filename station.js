/**
 * Created by will on 25/07/16.
 */

var Entity = require('./entity.js');

var Station = function(name, x, y) {

    var self = Entity();

    //Station Name
    self.id = Math.random();
    self.name = name;

    self.angle = 0;

    self.x = x;
    self.y = y;

    self.w = 200;
    self.h = 200;

    //Colour (Temporary!)
    self.r = Math.floor(Math.random() * (255) + 1);
    self.g = Math.floor(Math.random() * (255) + 1);
    self.b = Math.floor(Math.random() * (255) + 1);

    //Functions
    var superUpdate = self.update;

    self.update = function() {
        superUpdate();
    };

    Station.list[self.id] = self;

    return self;
};

Station.list = {};

Station.update = function() {
    var pack = [];

    for(var s in Station.list) {

        var station = Station.list[s];

        station.update();

        pack.push({
            x:station.x,
            y:station.y,
            w:station.w,
            h:station.h,
            r:station.r,
            g:station.g,
            b:station.b
        })
    }
    return pack;
};

module.exports = Station;