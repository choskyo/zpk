/**
 * Created by will on 23/07/16.
 */
var Entity = function() {
    var self = {
        x: 255,
        y: 255,
        w: 0,
        h: 0,
        speedX: 0,
        speedY: 0,
        id: "",
        angle: 0,
        maxShields: 999,
        shields: 999,
        area: 'testy'
    };

    self.storage = {
        kaching: {
            name: 'kaching',
            amount: 10
        },
        pew: {
            name: 'pew',
            amount: 5
        },
        zoom: {
            name: 'zoom',
            amount: 2
        }
    };

    self.intersects = function(extEntity) {
        return !(extEntity.x > self.x + self.w ||
        extEntity.x + extEntity.w < self.x ||
        extEntity.y > self.y + self.h ||
        extEntity.y + extEntity.h < self.y);

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