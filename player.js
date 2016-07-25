/**
 * Created by will on 21/07/16.
 */

var Entity = require('./entity.js');

var Player = function(id) {

    var self = Entity();

    //Client ID
    self.id         = id;

    //Colour (Temporary!)
    self.r          = Math.floor(Math.random()*(255)+1);
    self.g          = Math.floor(Math.random()*(255)+1);
    self.b          = Math.floor(Math.random()*(255)+1);

    //Movement
    self.keyRight   = false;
    self.keyLeft    = false;
    self.keyUp      = false;
    self.keyDown    = false;
    self.speed      = 10;

    //Functions
    self.updatePos = function() {
        if(self.keyRight)
            self.x += self.speed;
        if(self.keyLeft)
            self.x -= self.speed;
        if(self.keyUp)
            self.y -= self.speed;
        if(self.keyDown)
            self.y += self.speed;
    };

    return self;
};

module.exports = Player;