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
    self.maxSpeed   = 10;

    //Functions
    var super_update = self.update;

    self.update = function() {
        self.updateSpeed();
        super_update();
    };

    self.updateSpeed = function() {
        if(self.keyRight)
        {
            self.speedX = self.maxSpeed;
        }
        else if(self.keyLeft)
            self.speedX = -self.maxSpeed;
        else
            self.speedX = 0;

        if(self.keyUp)
            self.speedY = -self.maxSpeed;
        else if(self.keyDown)
            self.speedY = self.maxSpeed;
        else
            self.speedY = 0;
    };

    Player.list[id] = self;

    return self;
};

//Static methods
Player.list = {};
Player.onConnect = function(socket) {
    var player = Player(socket.id);

    socket.on('kP', function(p) {
        if(p.input === 'left') {
            player.keyLeft = p.state;
        }
        else if(p.input === 'right')
            player.keyRight = p.state;
        else if(p.input === 'up')
            player.keyUp = p.state;
        else if(p.input === 'down')
            player.keyDown = p.state;
    });
};
Player.onDisconnect = function(socket) {
    delete Player.list[socket.id];
};
Player.update = function() {
    var pack = [];
    for(var p in Player.list){
        var player = Player.list[p];

        //Check what's going on
        player.update();

        //Push data to packet
        pack.push({
            x:player.x,
            y:player.y,
            r:player.r,
            g:player.g,
            b:player.b
        });
    }
    return pack;
};

module.exports = Player;