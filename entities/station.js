/**
 * Created by will on 25/07/16.
 */

var Entity = require('./entity.js');
var Pack = require('./../data/pack.js');

var Station = function(name, x, y) {

    var self = Entity();

    //Station Name
    self.id = Math.random();
    self.name = name;

    self.x = x;
    self.y = y;

    self.w = 200;
    self.h = 200;

    //Colour (Temporary!)
    self.r = Math.floor(Math.random() * (255) + 1);
    self.g = Math.floor(Math.random() * (255) + 1);
    self.b = Math.floor(Math.random() * (255) + 1);

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
            area: self.area
        }
    };

    self.getUpdatePack = function() {
        return {
            id: self.id,
            x: self.x,
            y: self.y
        }
    };

    //Functions
    var superUpdate = self.update;

    self.update = function() {
        superUpdate();
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