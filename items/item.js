/**
 * Created by will on 31/08/16.
 */
var Item = function(name, amt, size, type, gear, bval) {
    var self = {
        name: "",
        amt: 0,
        type: "",
        gear: false,
        bval: 0,
        size: 0
    };

    if(name != null)
        self.name = name;
    if(amt != null)
        self.amt = amt;
    if(type != null)
        self.type = type;
    if(gear  != null)
        self.gear = gear;
    if(bval != null)
        self.bval = bval;
    if(size != null)
        self.size = size;

    self.addItem = function(amount) {
        self.amt += amount;
    };
    self.remItem = function(amount) {
        self.amt -= amount;
    };

    return self;
};

var Equippable = function() {
    var self = Item();

    self.gear = true;
    self.equipped = false;

    self.unequip = function() {
        self.equipped = false;
    };
    self.equip = function() {
        self.equipped = true;
    };
};

var Weapon = function() {
    var self = Equippable();

    self.damage = 0;
    //ms
    self.rof = 1000;
};

var Shield = function() {
    var self = Item();

    self.bank = 10;
    self.recharge = 0.5;
};