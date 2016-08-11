/**
 * Created by will on 21/07/16.
 */
var Database = require('../data/database.js');
var db = new Database();

var Entity = require('./entity.js');
var Projectile = require ('./projectile.js');
var Station = require ('./station.js');
var Wormhole = require ('./wormhole.js');
var Team = require('./team.js');
var Pack = require('./../data/pack.js');
var Storage = require('./../items/storage');

//Player Object
var Player = function(id, savedData) {

    var self = Entity();

    //Client ID
    self.id         = id;
    self.name   = "";

    self.storage = new Storage(self);

    if(savedData.username != undefined)
        self.name = savedData.username;
    if(savedData.x != undefined)
        self.x = savedData.x;
    if(savedData.y != undefined)
        self.y = savedData.y;
    if(savedData.storage != undefined)
        self.storage = savedData.storage;

    self.w = 30;
    self.h = 15;

    //Colour (Temporary!)
    self.r          = Math.floor(Math.random()*(255)+1);
    self.g          = Math.floor(Math.random()*(255)+1);
    self.b          = Math.floor(Math.random()*(255)+1);

    //Misc info
    self.team = Team.list['safe'];
    self.killCount = 0;
    self.maxShields = 4;
    self.shields = 4;
    self.centerX = 0;
    self.centerY = 0;
    self.docking = false;
    self.docked = false;
    self.canShoot = true;
    self.canWarp = true;
    self.warping = false;

    //Mouse Info
    self.mouseAngle = 0;
    self.screenCenterX = 0;
    self.screenCenterY = 0;
    self.mouseX = 0;
    self.mouseY = 0;
    self.click = false;

    //Movement
    self.keyRight   = false;
    self.keyLeft    = false;
    self.keyUp      = false;
    self.keyDown    = false;
    self.speed      = 0;
    self.maxSpeed   = 8;

    //Pack funcs
    self.getInitPack = function() {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            w: self.w,
            h: self.h,
            r: self.r,
            g: self.g,
            b: self.b,
            shields: self.shields,
            maxShields: self.maxShields,
            storage: self.storage,
            area: self.area
        }
    };

    self.zoom = function() {
        for(var wh in Wormhole.list) {
            var w = Wormhole.list[wh];

            if(self.getDistance(w) < 40 && self.area == w.area) {
                self.area = w.destination;
                self.canWarp = false;
                setTimeout(function() {
                    self.canWarp = true;
                }, 500);
            }
        }
    };

    self.getUpdatePack = function() {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            r: self.r,
            g: self.g,
            b: self.b,
            shields: self.shields,
            storage: self.storage.contents,
            angle: self.angle,
            area: self.area,
            docked: self.docked
        }
    };

    self.dock = function() {
        for(var st in Station.list) {
            var s = Station.list[st];

            if(self.intersects(s) && self.area == s.area) {
                self.docked = true;
            }
        }
    };

    //Functions
    var superUpdate = self.update;

    self.update = function() {
        superUpdate();

        if(!self.docking && self.docked) {
            self.docked = false;
        }

        if(self.docking && !self.docked) {
            self.dock();
        }

        if (self.docked) {
            self.speedX = 0;
            self.speedY = 0;
            return;
        }

        self.updateSpeed();


        //self.centerX = self.x+50;
        //self.centerY = self.y+30;
        //self.mouseAngle = Math.atan2(self.mouseY - self.screenCenterY, self.mouseX - self.screenCenterX) * 180 / Math.PI;

        if(self.click && self.canShoot) {
            self.pew(self.mouseAngle);
            self.canShoot = false;
            setTimeout(function() {
                self.canShoot = true;
            }, 500);
        }

        if(self.warping && self.canWarp) {
            self.zoom();
        }

    };

    self.pew = function(angle) {
        var p = Projectile(self.id, angle);
        p.area = self.area;
        p.team = self.team;
        p.x = self.x + self.w/2;
        p.y = self.y + self.h/2;
    };

    self.updateSpeed = function() {

        //console.log('X: ' + self.speedX + ' Y: ' + self.speedY);

        if(self.keyRight) {
            if(self.angle < 360 && self.angle > -360)
                self.angle += 6;
            else
                self.angle = 0;
        }
        else if(self.keyLeft) {
            if(self.angle < 360 && self.angle > -360)
                self.angle -= 6;
            else
                self.angle = 0;
        }

        var degX = Math.cos(self.angle/180*Math.PI) *0.5 ;
        var degY = Math.sin(self.angle/180*Math.PI) *0.5 ;

        if(self.keyUp) {
            if(self.speedX > -self.maxSpeed && self.speedX < self.maxSpeed) {
                self.speedX += degX;
            }
            else if (self.speedX <= -self.maxSpeed && degX > 0) {
                self.speedX += degX;
            }
            else if (self.speedX >= self.maxSpeed && degX < 0) {
                self.speedX += degX;
            }

            if(self.speedY >= -self.maxSpeed && self.speedY < self.maxSpeed) {
                self.speedY += degY;
            }
            else if (self.speedY <= -self.maxSpeed && degY > 0) {
                self.speedY += degY;
            }
            else if (self.speedY > self.maxSpeed && degY < 0) {
                self.speedY += degY;
            }
        }
        else if(self.keyDown) {
            if(self.speedX > -self.maxSpeed && self.speedX < self.maxSpeed) {
                self.speedX -= degX;
            }
            else if (self.speedX < -self.maxSpeed && degX < 0) {
                self.speedX -= degX;
            }
            else if (self.speedX >= self.maxSpeed && degX > 0) {
                self.speedX -= degX;
            }

            if(self.speedY > -self.maxSpeed && self.speedY < self.maxSpeed) {
                self.speedY -= degY;
            }
            else if (self.speedY <= -self.maxSpeed && degY < 0) {
                self.speedY -= degY;
            }
            else if (self.speedY >= self.maxSpeed && degY > 0) {
                self.speedY -= degY;
            }
        }

    };

    self.respawn = function() {
        self.speedX = 0;
        self.speedY = 0;
        self.x = Math.random()*500;
        self.y = Math.random()*500;
        self.shields = self.maxShields;
    };

    self.setRed = function() {
        self.team = Team.list['red'];
        self.r = 255;
        self.g = Math.floor(Math.random()*(75)+1);
        self.b = Math.floor(Math.random()*(75)+1);
    };

    self.setBlue = function() {
        self.team = Team.list['blue'];
        self.r = Math.floor(Math.random()*(75)+1);
        self.g = Math.floor(Math.random()*(75)+1);
        self.b = 255;
    };

    self.setSafe = function() {
        self.team = Team.list['safe'];
        self.r = Math.floor(Math.random()*(75)+1);
        self.g = Math.floor(Math.random()*(75)+1);
        self.b = Math.floor(Math.random()*(75)+1);
    };

    Player.list[id] = self;

    Pack.initPack.players.push(self.getInitPack());

    return self;
};

//Static methods
exports.playerList = Player.list = {};
Player.onConnect = function(socket, user) {
    var player = Player(socket.id, user);

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
        else if(p.input === 'attack')
            player.click = p.state;
        else if(p.input === 'mousePos') {
            player.screenCenterX = p.co.centerX;
            player.screenCenterY = p.co.centerY;
            player.mouseX = p.co.x;
            player.mouseY = p.co.y;
        }
        else if(p.input == 'warp') {
            player.warping = p.state;
        }
        else if(p.input == 'dock') {
            player.docking = p.state;
        }
    });

    socket.emit('initPack', {
        ownId: socket.id,
        players: Player.getAllPacks(),
        projectiles: Projectile.getAllPacks(),
        stations: Station.getAllPacks(),
        wormholes: Wormhole.getAllPacks(),
        teams: Team.getAllPacks()
    });
};
Player.getAllPacks = function() {
    var players = [];
    for(var p in Player.list)
        players.push(Player.list[p].getInitPack());
    return players;
};
Player.onDisconnect = function(socket) {
    if(Player.list[socket.id] != undefined)
        db.savePlayer(Player.list[socket.id]);

    Pack.delPack.players.push(socket.id);
    delete Player.list[socket.id];
};
Player.update = function() {
    var pack = [];
    for(var p in Player.list){
        var player = Player.list[p];

        //Check what's going on
        player.update();

        //Push data to packet
        pack.push(player.getUpdatePack());
    }
    return pack;
};

module.exports = Player;