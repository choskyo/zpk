/**
 * Created by will on 23/07/16.
 */
var Storage = require('../items/storage.js');
var Entity = function() {
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

    self.storage = {};

    self.intersects = function(e) {
        return !(e.x > self.x + self.w ||
        e.x + e.w < self.x ||
        e.y > self.y + self.h ||
        e.y + e.h < self.y);
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

    return self;
};

module.exports = Entity;