/**
 * Created by will on 23/07/16.
 */
var Entity = function() {
    var self = {
        x: 255,
        y: 255,
        speedX: 0,
        speedY: 0,
        id: ""
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