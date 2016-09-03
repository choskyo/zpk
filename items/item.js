/**
 * Created by will on 31/08/16.
 */
module.exports = {
    Item: function(name, amt, size, type, gear, bval) {
        var self = {
            name: "",
            type: "",
            amount: 1,
            gear: false,
            rval: 0,
            bval: 0,
            maxval: 0,
            minval: 0,
            size: 0
        };

        if(name != null)
            self.name = name;
        if(amt != null)
            self.amount = amt;
        if(type != null)
            self.type = type;
        if(gear  != null)
            self.gear = gear;
        if(bval != null)
            self.bval = bval;
        if(size != null)
            self.size = size;

        self.rval = self.bval;
        self.maxval = self.bval*1.40;
        self.minval = self.bval*0.60;

        self.addItem = function(amount) {
            self.amt += amount;
        };
        self.remItem = function(amount) {
            self.amt -= amount;
        };

        return self;
    },

    Equippable: function(name, amt, size, type, gear, bval) {
        var Item = require('./item.js').Item;
        var self = Item(name, amt, size, type, gear, bval);

        self.gear = true;
        self.equipped = false;

        self.unequip = function() {
            self.equipped = false;
        };
        self.equip = function() {
            self.equipped = true;
        };
        return self;
},

    Weapon: function(name, amt, size, type, gear, bval, dmg, rof) {
        var Equippable = require('./item.js').Equippable;
        var self = Equippable(name, amt, size, type, gear, bval);

        self.damage = dmg;
        //ms
        self.rof = rof;
        return self;
},

    Shield: function() {
    var self = Equippable();

    self.bank = 10;
    self.recharge = 0.5;
},

    Engine: function() {
    var self = Equippable();

    self.maxSpeed = 5;
    self.accel = 1;
    self.turning = 1;
}
};
