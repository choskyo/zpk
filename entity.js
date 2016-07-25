/**
 * Created by will on 23/07/16.
 */
var Entity = function() {
    var self = {
        x: 255,
        y: 255,
        speed: 1,
        id: ""
    };

    self.update = function() {
        self.updatePos();
    };

    self.updatePos = function() {
        self.x += speed;
        self.y += speed;
    };

    return self;
};

module.exports = Entity;