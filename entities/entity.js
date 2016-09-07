/**
 * Created by will on 23/07/16.
 */
var Storage = require('../items/storage.js');

var Entity = function() {
    var whList = require ('./wormhole.js').list;
    
    var self = {
        name: "",
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        speedX: 0,
        speedY: 0,
        id: "",
        angle: 0,
        maxShields: 999,
        shields: 999,
        area: 'testy',
        docked: false
    };

    self.storage = new Storage(self);

    self.loadSave = function(savedData) {
        if(savedData.username != undefined)
            self.name = savedData.username;
        if(savedData.x != undefined)
            self.x = savedData.x;
        if(savedData.y != undefined)
            self.y = savedData.y;
        if(savedData.area != undefined)
            self.area = savedData.area;
        if(savedData.storage != undefined)
            self.storage.contents = savedData.storage;
        if(savedData.credits != undefined && !isNaN(savedData.credits))
            self.credits = savedData.credits;
    };

    self.intersects = function(e) {
        return !(e.x > self.x + self.w ||
        e.x + e.w < self.x ||
        e.y > self.y + self.h ||
        e.y + e.h < self.y);
    };

    self.getAngle = function(e) {
        var angle = Math.atan2(e.y - self.y, e.x - self.x) * 180/Math.PI;
        if(angle < 0)
        {
            angle = 360 - (-angle);
        }
        return angle;
    };

    self.getDistance = function(e) {
        return Math.hypot(e.x - self.x, e.y - self.y);
    };

    self.update = function() {
        self.updatePos();
    };

    self.updatePos = function() {
        self.x += self.speedX;
        self.y += self.speedY;
    };

    self.zoom = function() {
        for(var wh in whList) {
            var w = whList[wh];

            if(self.getDistance(w) < 80 && self.area == w.area) {
                self.area = w.destination;
                self.canWarp = false;
                setTimeout(function() {
                    self.canWarp = true;
                }, 500);
            }
        }
    };

    return self;
};

module.exports = Entity;