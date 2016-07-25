/**
 * Created by will on 25/07/16.
 */

var Entity = require('./entity.js');

var Station = function(name, x, y) {

    var self = Entity();

    //Station Name
    self.name = name;

    self.x = x;
    self.y = y;

    self.w = 200;
    self.h = 200;

    //Colour (Temporary!)
    self.r = Math.floor(Math.random() * (255) + 1);
    self.g = Math.floor(Math.random() * (255) + 1);
    self.b = Math.floor(Math.random() * (255) + 1);

    return self;
};

module.exports = Station;