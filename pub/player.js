/**
 * Created by will on 24/07/16.
 */
var Player = function (initPack) {
    var self = {};
    self.id = initPack.id;
    self.number = initPack.number;
    self.x = initPack.x;
    self.y = initPack.y;
    self.w = initPack.w;
    self.h = initPack.h;
    Player.list[self.id] = self;

    return self;
};

Player.list = {};