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
        b: Math.floor(Math.random()*(255)+1)
    };
    return self;
};

module.exports = Player;