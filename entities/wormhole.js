/**
 * Created by will on 07/08/16.
 */
var Entity = require('./entity.js');
var Pack = require('./../data/pack.js');

var Wormhole = function(name, x, y, area, destination) {

    var self = Entity();

    //Station Name
    self.id = Math.random();
    self.name = name;

    self.x = x;
    self.y = y;

    self.w = 20;
    self.h = 20;

    //Colour (Temporary!)
    self.r = 128;
    self.g = 0;
    self.b = 128;

    self.area = area;
    self.destination = destination;

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
            area: self.area,
            destination: self.destination
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

    Wormhole.list[self.id] = self;

    return self;
};

Wormhole.list = {};
Wormhole.getAllPacks = function() {
    var wormholes = [];
    for(var w in Wormhole.list)
        wormholes.push(Wormhole.list[w].getInitPack());
    return wormholes;
};
Wormhole.update = function() {
    var pack = [];

    for(var w in Wormhole.list) {

        var wormhole = Wormhole.list[w];

        wormhole.update();

        pack.push(wormhole.getUpdatePack());
    }
    return pack;
};

module.exports = Wormhole;