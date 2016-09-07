/**
 * Created by will on 19/08/16.
 */
var Entity = require('./entity.js');
var Planet = function(name, pathRad, rad, cX, cY, speed, area) {

    var self = Entity();

    //Station Name
    self.id = Math.random();
    self.name = name;

    self.cX = cX;
    self.cY = cY;

    self.rad = rad;
    self.pathRad = pathRad;

    self.speed = speed;

    self.angle = 0;

    self.area = area;

    //Pack funcs
    self.getInitPack = function() {
        return {
            id: self.id,
            name: self.name,
            x: self.x,
            y: self.y,
            cX: self.cX,
            cY: self.cY,
            area: self.area,
            rad: self.rad,
            pathRad: self.pathRad
        }
    };

    self.getUpdatePack = function() {
        return {
            id: self.id,
            x: self.x,
            y: self.y
        }
    };

    self.update = function() {
        self.x = self.cX + (self.pathRad * Math.cos(self.angle));
        self.y = self.cY + (self.pathRad * Math.sin(self.angle));
        self.angle += self.speed;
    };

    Planet.list[self.id] = self;

    return self;
};

Planet.list = {};
Planet.getAllPacks = function() {
    var planets = [];
    for(var p in Planet.list)
        planets.push(Planet.list[p].getInitPack());
    return planets;
};
Planet.update = function() {
    var pack = [];

    for(var p in Planet.list) {

        var planet = Planet.list[p];

        planet.update();

        pack.push(planet.getUpdatePack());
    }
    return pack;
};

module.exports = Planet;