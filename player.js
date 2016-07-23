/**
 * Created by will on 21/07/16.
 */

var Player = function(id) {
    var self = {

        //Client ID
        id: id,

        //Position
        x: 255,
        y: 255,

        //Colour (Temporary!)
        r: Math.floor(Math.random()*(255)+1),
        g: Math.floor(Math.random()*(255)+1),
        b: Math.floor(Math.random()*(255)+1),

        //Movement
        keyRight: false,
        keyLeft: false,
        keyUp: false,
        keyDown: false,
        speed: 10

    };

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